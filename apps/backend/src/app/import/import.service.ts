import { Injectable } from '@nestjs/common';
import { Calendar, EventType, PrismaClient, User } from '@prisma/client';

@Injectable()
export class ImportService {
    private prisma = new PrismaClient();

    public getAvailableImports() {
        return this.prisma.eventReferential.groupBy({
            by: ['type', 'country']
        })
    }

    public async importEventsFromReferential(email: string, type: EventType, country: string): Promise<number> {
        const events = await this.prisma.eventReferential.findMany({
            where: {
                AND: {
                    country,
                    type
                }
            }
        })

        const eventsForCreation = events.map(event => ({
            event: {
                create: {
                    title: event.title,
                    day: event.day,
                    month: event.month,
                },
            },
        }));

        const currentUser = await this.ensureUser(email);

        await this.createCalendarEvents(`${type}_${country}`, currentUser.id, eventsForCreation);

        return events.length
    }

    public async saveEventsFromFileCsv(content: string, email: string): Promise<number> {
        const NEW_LINE = '\r\n';
        const SEPARATOR = ',';

        const lines = content.split(NEW_LINE);

        const events = lines.slice(1).map(line => line.split(SEPARATOR));

        const eventsForCreation = events.map(([day, month, title]) => ({
            event: {
                create: {
                    title,
                    day,
                    month,
                },
            },
        }));

        const currentUser = await this.ensureUser(email);

        await this.createCalendarEvents('default', currentUser.id, eventsForCreation);

        return events.length;
    }

    private async ensureUser(email: string): Promise<Partial<User>> {
        return this.prisma.user.upsert({
            create: {
                email,
                name: email.split('@')[0]
            },
            update: {},
            where: {
                email
            }
        })
    }

    private async createCalendarEvents(calendar: string, userId: number, events: any): Promise<Partial<Calendar>> {
        return this.prisma.calendar.upsert({
            create: {
                name: calendar,
                owner: {
                    connect: {
                        id: userId
                    }
                },
                events: { create: events }
            },
            update:  {
                events: {
                    create: events
                }
            },
            where: {
                name_ownerId: {
                    name: calendar,
                    ownerId: userId
                }
            }
        });
    }
}
