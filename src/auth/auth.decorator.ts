import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SecurityContext } from '@/auth/authentication/types';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user as SecurityContext;
  },
);
