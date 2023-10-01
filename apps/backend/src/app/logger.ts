// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
// import { Params } from '@feathersjs/feathers';
import { createLogger, format, transports } from 'winston'

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
})

export enum API_EVENT {
    CREATE = 'Create',
    READ   = 'Read',
    UPDATE = 'Update',
    DELETE = 'Delete',
}


// export const logApiEvent = (event: API_EVENT, domain: string, message?: string, params?: Params<any>) => {
//     const contextMsg = `[${event}] [${domain}]`;
//     const msg = message ? ` - ${message}` : '';
//     const paramMsg = params ? ` | with params [ ${params} ]` : '';

//     logger.info(`${contextMsg}${paramMsg}${msg}`)
// }
