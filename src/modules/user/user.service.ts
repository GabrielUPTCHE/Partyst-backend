import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor (private prismaService: PrismaService) {}

    async getAllUsers(): Promise<User[]>{
        return this.prismaService.user.findMany();
    }

    async getByEmail (email:string): Promise<User> {
        return this.prismaService.user.findFirstOrThrow({where:{email}});
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User | any> {
        data.birthdate = new Date(data.birthdate);
        const user: User | any = await this.prismaService.user.create({
            data
        })
        return user;
    }
}
