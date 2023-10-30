/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'tslib';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { ServerOptions, createServer } from 'spdy';

import { AppModule } from './app/app.module';

// Load env variables
ConfigModule.forRoot();

async function bootstrap() {
    const certs = join(__dirname, './assets/certs');
    const ops: ServerOptions = {
        key:  readFileSync(`${certs}/key.pem`),
        cert: readFileSync(`${certs}/cert.pem`),
    }
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

    Logger.log(
        `🚀 Application is running on: https://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
