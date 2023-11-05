import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const auth = ctx.switchToHttp().getRequest().account;
    if (auth === undefined) {
      return null;
    } else {
      return auth;
    }
  },
);
