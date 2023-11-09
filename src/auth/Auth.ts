import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WebException } from '@/misc/error/exception/WebException';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const auth = ctx.switchToHttp().getRequest().account;
    if (auth === undefined) {
      throw new WebException('AuthToken is undefined');
    } else {
      return auth;
    }
  },
);
