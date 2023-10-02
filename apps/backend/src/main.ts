/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'tslib';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { ServerOptions, createServer } from 'spdy';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const certs = join(__dirname, './assets/certs');
    // const httpsOptions = {
    //     key:  readFileSync(`${certs}/key.pem`),
    //     cert: readFileSync(`${certs}/cert.pem`),
    // }
    const ops: ServerOptions = {
        key:  readFileSync(`${certs}/key.pem`),
        cert: readFileSync(`${certs}/cert.pem`),
    }
    // const app = await NestFactory.create(AppModule, { httpsOptions });
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    const server = createServer(ops, expressApp)

    // Used for giving a global namespace: http:localhost/api
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    app.enableCors();
    console.log(process.env.PORT);
    const port = process.env.PORT || 443;
    // await app.listen(port);

    await app.init();
    await server.listen(port);

    // const server = createServer({

    // }, app.callback())
    // .listen(443);

    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
