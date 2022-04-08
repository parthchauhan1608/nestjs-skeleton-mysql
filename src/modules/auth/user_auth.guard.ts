import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserAuthService } from './user_auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly userAuthService: UserAuthService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.userAuthService.isAuthenticatedUser(request);
  }
}
