import { createServer } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';

import { app } from './app'
import { logger } from './logger'

const CERTIFICATES = join(__dirname, '/certs');

// const server = createServer({
//     key:  readFileSync(`${CERTIFICATES}/key.pem`),
//     cert: readFileSync(`${CERTIFICATES}/cert.pem`),
// }, app.callback())
// .listen(443);

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})

// app.setup(server);

// server.on('listening', () => logger.info('Feathers application started'));
