import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../authentication/decorators/auth.decorator';
import { Role } from 'src/constant/role';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Auth(Role.C, Role.AD, Role.AR)
    @Get('get-all')
    async getAllUsers():Promise<User[]>{
        return this.userService.getAllUsers();
    }


    @Post('create')
    async createUser(@Body() data: User | any):Promise<User | any>{
        try {
            data.password = await bcrypt.hash(data.password, 16);
            const user = await this.userService.createUser(data)
            return  {status:'success', detail:'Creacion exitosa', message:'Usuario creado con éxito. ¡Bienvenido!', user:user};
        } catch (error) {
            console.error('Error creando usuario:', error);
            if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
                return {status:'error',code:error.code,detail:'Nombre de usuario repetido', message: 'El nombre de usuario ya está en uso. Por favor, elija otro.'}
            }
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }
}

