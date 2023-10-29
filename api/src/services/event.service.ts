import { NullableId, Params } from '@feathersjs/feathers';
import { Calendar, Event, PrismaClient } from '@prisma/client';
import { API_EVENT, logApiEvent } from '../logger';

type FindEventsParams = {
    username?: string,
    date?: string,
}

const EVENT_NAME = 'Events';
export class EventService {
    private prisma = new PrismaClient();

    async find(params: Params<FindEventsParams>): Promise<Event[]> {
        logApiEvent(API_EVENT.READ, EVENT_NAME, undefined, params);

        if (params.query?.username ) {
            return this.findEventsForUser(params.query.username, params.query.date);
        }

        return await this.prisma.event.findMany();
    }

    async create({ day, month, title }: Pick<Event, 'title' | 'day' | 'month'>) {
        logApiEvent(API_EVENT.CREATE, EVENT_NAME);

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
        logApiEvent(API_EVENT.DELETE, EVENT_NAME);

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

    //

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

    private splitDate(date?: string): string [] {
        if (!date) {
            return [];
        }

        return [
            date.substring(2, 4),
            date.substring(0, 2),
        ]
    }
}
