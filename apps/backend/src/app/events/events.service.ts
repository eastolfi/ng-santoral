import { Injectable } from '@nestjs/common';
import { Calendar, Event, PrismaClient } from '@prisma/client';

import { AppPrismaCrudService } from '../app-prisma-crud.service';
// import { API_EVENT, logApiEvent } from '../logger';

type FindEventsParams = {
    username?: string,
    date?: string,
}

@Injectable()
export class EventsService extends AppPrismaCrudService<Event> {
    private prisma = new PrismaClient();

    constructor() {
        super({
            model: 'event',
            allowedJoins: ['calendars.calendar.owner'],
            defaultJoins: [],
        });
    }

    async create2({ day, month, title }: Pick<Event, 'title' | 'day' | 'month'>) {
        // logApiEvent(API_EVENT.CREATE, EVENT_NAME);

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

    async remove2(id: string) {
        // logApiEvent(API_EVENT.DELETE, EVENT_NAME);

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
