import { NullableId, Params } from '@feathersjs/feathers';
import { Calendar, Event, PrismaClient } from '@prisma/client';

type FindEventsParams = {
    username?: string,
    date?: string,
}

export class EventService {
    private prisma = new PrismaClient();

    private splitDate(date?: string): string [] {
        if (!date) {
            return [];
        }

        return [
            date.substring(2, 4),
            date.substring(0, 2),
        ]
    }

    async find(params: Params<FindEventsParams>): Promise<Event[]> {
        if (params.query?.username ) {
            return this.findEventsForUser(params.query.username, params.query.date);
        }

        return await this.prisma.event.findMany();
    }

    private async findEventsForUser(username: string, date?: string): Promise<Event[]> {
        const [ day, month ] = this.splitDate(date)
        return await this.prisma.event.findMany({
            where: {
                calendars: {
                    some: {
                        calendar: {
                            owner: {
                                name: {
                                    equals: username
                                }
                            }
                        }
                    }
                },
                day,
                month
            }
        })
    }

    async create({ day, month, title }: Pick<Event, 'title' | 'day' | 'month'>) {
        const calendar: Pick<Calendar, 'id'> = await this.prisma.calendar.findFirstOrThrow({
            select: {
                id: true
            },
            where: {
                id: 1
            }
        });

        return this.prisma.event.create({
            data: {
                day, month, title,
                calendars: {
                    connectOrCreate: {
                        create: {
                            calendarId: calendar.id
                        },
                        where: {
                            id: calendar.id
                        }
                    }
                }
            }
        })
    }

    async remove(id: NullableId) {
        if (!id) {
            throw new Error('mo');
        }

        const eventId = parseInt(id.valueOf() as string);

        const deleteRelation = this.prisma.eventsForCalendar.deleteMany({
            where: {
                eventId
            }
        })

        const deleteEvent = this.prisma.event.delete({
            where: {
                id: eventId
            }
        });

        return this.prisma.$transaction([deleteRelation, deleteEvent]);
    }
}
