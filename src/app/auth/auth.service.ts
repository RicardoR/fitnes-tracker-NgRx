import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';

@Injectable()
export class AuthService {
  private _isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _auth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _snackBar: MatSnackBar
  ) {}

  public initAuthListener(): void {
    this._auth.authState.subscribe((user) => {
      if (user) {
        this._isAuthenticated = true;
        this._router.navigate(['training']);
        this.authChange.next(true);
      } else {
        this._trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this._router.navigate(['login']);
        this._isAuthenticated = false;
      }
    });
  }

  public registerUser(authData: AuthData): void {
    this._auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then()
      .catch((err) => this._openErrorMessage(err));
  }

  public login(authData: AuthData): void {
    this._auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then()
      .catch((err) => this._openErrorMessage(err));
  }

  public logout(): void {
    this._auth.signOut();
  }

  public isAuth(): boolean {
    return this._isAuthenticated;
  }

  private _openErrorMessage(err: Error): void {
    this._snackBar.open(err.message, null, { duration: 3000 });
  }
}
