import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../constant/role';
import { User, Prisma } from 'generated/prisma';
import { METADATA_ROLES } from '../decorators/role.decorator';

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const requiredRoles = this.reflector.getAllAndOverride<Role[]>(METADATA_ROLES, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles || requiredRoles.length == 0) {
                resolve(true);
            }
            const { user } = context.switchToHttp().getRequest();
            let hasRole = requiredRoles.find((role) => user?.user?.type_user === role.valueOf());
            if (hasRole) {
                resolve(true);
            } else {
                reject(new UnauthorizedException());
            }
        });
    }
}