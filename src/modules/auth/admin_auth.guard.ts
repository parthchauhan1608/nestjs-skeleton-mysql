import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin_auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private adminAuthService: AdminAuthService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.adminAuthService.isAuthenticatedUser(request);
  }
}
