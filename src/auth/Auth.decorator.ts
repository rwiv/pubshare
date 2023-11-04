import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SecurityContext } from '@/auth/authentication/types';

export const AuthDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().account as SecurityContext;
  },
);