import { Injectable } from '@nestjs/common';
import { EventType, PrismaClient } from '@prisma/client';

@Injectable()
export class ImportService {
    private prisma = new PrismaClient();

    public getAvailableImports() {
        return this.prisma.eventReferential.groupBy({
            by: ['type', 'country']
        })
    }

    public async importEventsFromReferential(email: string, type: EventType, country: string) {
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

        const currentUser = await this.prisma.user.upsert({
            create: {
                email,
                name: email.split('@')[0]
            },
            update: {},
            where: {
                email
            }
        })

        const calendarName = `${type}_${country}`;
        await this.prisma.calendar.upsert({
            create: {
                name: calendarName,
                owner: {
                    connect: {
                        id: currentUser.id
                    }
                },
                events: { create: eventsForCreation }
            },
            update:  {
                events: {
                    create: eventsForCreation
                }
            },
            where: {
                name_ownerId: {
                    name: calendarName,
                    ownerId: currentUser.id
                }
            }
        })

        return [events.length]
    }
}
