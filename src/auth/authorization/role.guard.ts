import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRoles, AccountRole } from '@/domain/account/persistence/account.role';
import { ROLES_KEY } from '@/auth/authorization/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<AccountRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { account } = context.switchToHttp().getRequest();
    const roles = getRoles(account.role);
    return requiredRoles.some((role) => roles.includes(role));
  }
}
