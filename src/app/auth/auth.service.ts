import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  private _isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(private _router: Router, private _auth: AngularFireAuth) {}

  public registerUser(authData: AuthData): void {
    this._auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.authSuccesfully())
      .catch((err) => console.log(err));
  }

  public login(authData: AuthData): void {
    this._auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.authSuccesfully())
      .catch((err) => console.log(err));
  }

  public logout(): void {
    this.authChange.next(false);
    this._router.navigate(['login']);
    this._isAuthenticated = false;
  }

  public isAuth(): boolean {
    return this._isAuthenticated;
  }

  private authSuccesfully(): void {
    this._isAuthenticated = true;
    this._router.navigate(['training']);
    this.authChange.next(true);
  }
}
