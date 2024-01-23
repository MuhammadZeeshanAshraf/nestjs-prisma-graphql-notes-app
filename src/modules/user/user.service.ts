import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { CrudService } from 'src/common/abstract/crud.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapType } from './mapping/user.mapping';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate, UserMapType> {
    constructor(private prisma: PrismaService) {
        super(prisma.user);
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, name } = createUserDto;
        const hashPassword = await hash(password, 10);
        const dto: Prisma.UserCreateArgs = {
            data: {
                email: email,
                password: hashPassword,
                name: name,
            },
        };

        const user: User = (await this.create(dto)) as User;
        delete user.password;
        return user;
    }

    findAll(): Promise<User[]> {
        const condition: Prisma.UserFindManyArgs = {
            where: {},
            select: {
                id: true,
                email: true,
                name: true,
            },
        };
        return this.findMany(condition) as Promise<User[]>;
    }
}
