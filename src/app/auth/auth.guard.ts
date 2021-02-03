import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this._doCheck();
  }

  canLoad(route: Route): boolean {
    return this._doCheck();
  }

  private _doCheck(): boolean {
    if (this._authService.isAuth()) {
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }
}
