import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getHandler());
    console.log('=====> '+role)
    if(!role){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user
    return role.find((r) => {
      console.log('==> ' + user.role)
      console.log(role)
      return r === user.role ;
    });
  }
}
