import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable()
export class AuthService {
  private _user: User;
  public authChange = new Subject<boolean>();

  constructor(private _router: Router) {}

  public registerUser(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authSuccesfully();
  }

  public login(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authSuccesfully();
  }

  public logout(): void {
    this._user = null;
    this.authChange.next(false);
    this._router.navigate(['login']);
  }

  public getUser(): User {
    return { ...this._user };
  }

  public isAuth(): boolean {
    return this._user != null;
  }

  private authSuccesfully(): void {
    this._router.navigate(['training']);
    this.authChange.next(true);
  }
}
