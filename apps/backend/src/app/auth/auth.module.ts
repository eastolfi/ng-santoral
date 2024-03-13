import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Auth0Strategy } from './auth0.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
        UsersModule,
    ],
    providers: [
        AuthService,
        Auth0Strategy,
        JwtStrategy,
    ],
    controllers: [
        AuthController
    ],
    exports: [
        PassportModule
    ],
})
export class AuthModule {}
