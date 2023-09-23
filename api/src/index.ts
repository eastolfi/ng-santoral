import { createServer } from 'https';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { app } from './app'
import { logger } from './logger'

const certsDir = join(__dirname, '/certs');

const server = createServer({
    key:  readFileSync(`${certsDir}/key.pem`),
    cert: readFileSync(`${certsDir}/cert.pem`),
}, app.callback())
.listen(443);

// const port = app.get('port')
// const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

// app.listen(port).then(() => {
//   logger.info(`Feathers app listening on http://${host}:${port}`)
// })

app.setup(server);

server.on('listening', () => logger.info('Feathers application started'));
