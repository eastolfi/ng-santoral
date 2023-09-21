// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'
import { EventService } from './event.service';

export const services = (app: Application) => {
  app.use('events', new EventService());
}
