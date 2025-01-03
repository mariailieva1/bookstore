import { IUser } from '@common/interfaces/user.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUser => {
    return context.switchToHttp().getRequest().user;
  },
);
