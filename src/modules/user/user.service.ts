import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { CrudService } from 'src/common/abstract/crud.service';
import { RESPONSE_STATUS } from 'src/common/constants';
import { HandledErrorModel } from 'src/common/types/error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserMapType } from './mapping/user.mapping';

@Injectable()
export class UserService extends CrudService<Prisma.UserDelegate, UserMapType> {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
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

    async login(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const user = (await this.findUnique({
            where: { email: email },
        })) as User;
        if (!user) {
            const message = 'User not found';
            return new HandledErrorModel(RESPONSE_STATUS.FAIL, message, new Error(message));
        }
        if (!(await compare(password, user.password))) {
            const message = 'Invalid credentials';
            return new HandledErrorModel(RESPONSE_STATUS.FAIL, message, new UnauthorizedException(message));
        }

        return {
            access_token: await this.jwtService.signAsync({
                sub: user.id,
                email: user.email,
                name: user.name,
            }),
        };
    }
}
