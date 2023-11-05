import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  getHierarchicalTypes,
  AccountType,
} from '@/domain/account/persistence/accountType';
import { ACCOUNT_TYPE_KEY } from '@/auth/authorization/types';

@Injectable()
export class TypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<AccountType[]>(
      ACCOUNT_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredTypes) {
      return true;
    }
    const { account } = context.switchToHttp().getRequest();
    if (account === undefined) {
      return false;
    }

    const types = getHierarchicalTypes(account.type);
    return requiredTypes.some((type) => types.includes(type));
  }
}
