import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { UIService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';
import { State, STATE_TYPES } from '../app.reducer';

@Injectable()
export class AuthService {
  private _isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _auth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _uiService: UIService,
    private _store: Store<{ ui: State }>
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
    this._store.dispatch({ type: STATE_TYPES.START_LOADING });
    this._auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch({ type: STATE_TYPES.STOP_LOADING }))
      .catch((err) => this._manageError(err));
  }

  public login(authData: AuthData): void {
    this._store.dispatch({ type: STATE_TYPES.START_LOADING });
    this._auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch({ type: STATE_TYPES.STOP_LOADING }))
      .catch((err) => this._manageError(err));
  }

  public logout(): void {
    this._auth.signOut();
  }

  public isAuth(): boolean {
    return this._isAuthenticated;
  }

  private _manageError(err: Error): void {
    this._uiService.showSnackBar(err.message, null, 3000);
    this._store.dispatch({ type: STATE_TYPES.STOP_LOADING });
  }
}
