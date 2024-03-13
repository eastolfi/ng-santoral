import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

import { AppPrismaCrudService } from '../app-prisma-crud.service';

@Injectable()
export class UsersService extends AppPrismaCrudService<User> {
    private prisma = new PrismaClient();

    constructor() {
        super({
            model: 'user',
            allowedJoins: [],
            defaultJoins: [],
        });
    }

    public findByEmail(email: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
}
