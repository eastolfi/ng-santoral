/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import 'tslib';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import express from 'express';
import { ServerOptions, createServer } from 'spdy';

import { AppModule } from './app/app.module';
import { API_BEARER_NAME } from './app/shared/constants.api';

async function bootstrap() {
    const certs = join(__dirname, './assets/certs');
    const ops: ServerOptions = {
        key: readFileSync(`${certs}/key.pem`),
        cert: readFileSync(`${certs}/cert.pem`),
    };
    const expressApp = express();
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
    );
    const server = createServer(ops, expressApp);

    // Used for giving a global namespace: http:localhost/api
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    app.enableCors({
        origin: true,
        methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    console.log(process.env.PORT);
    const port = process.env.PORT || 443;
    // await app.listen(port);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Santoral - API')
        .setDescription('Santoral - API')
        .setVersion('1.1')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: "Authorization",
            in: 'header',
        })
        // .addOAuth2(
        //     {
        //         type: 'oauth2',
        //         description: 'Auth0 login',
        //         name: 'Authorization',
        //         flows: {
        //             implicit: {
        //                 authorizationUrl: `${process.env.AUTH0_ISSUER_URL}/authorize?audience=${process.env.AUTH0_AUDIENCE}`,
        //                 tokenUrl: process.env.AUTH0_AUDIENCE,
        //                 scopes: { 'User.Read': 'Read user profile' }
        //             },
        //         },
        //         scheme: 'Bearer',
        //         bearerFormat: 'Bearer',
        //         in: 'Header',
        //     },
        //     API_BEARER_NAME,
        // )
        .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, swaggerDoc, {
        customSiteTitle: 'Santoral - API UI',
        // swaggerOptions: {
        //     initOAuth: {
        //         clientId: process.env.AUTH0_CLIENT_ID,
        //         scopes: ['User.Read', 'profile', 'offline_access'],
        //         appName: 'Santoral',
        //     },
        //     oauth2RedirectUrl: 'https://localhost/swagger/oauth2-redirect.html',
        //     // oauth2RedirectUrl: `${window.location.protocol}/${window.location.host}/swagger/oauth2-redirect.html`,
        //     persistAuthorization: true,
        // }
    });

    await app.init();
    await server.listen(port);

    Logger.log(
        `🚀 Application is running on: https://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
