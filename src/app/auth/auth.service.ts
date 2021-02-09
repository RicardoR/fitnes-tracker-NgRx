import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { UIService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';

import * as fromRootReducer from '../app.reducer';
import * as fromUIActions from './../shared/reducers/ui.actions';
import * as fromAuthActions from './reducers/auth.actions';
@Injectable()
export class AuthService {
  constructor(
    private _router: Router,
    private _auth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _uiService: UIService,
    private _store: Store<fromRootReducer.State>
  ) {}

  public initAuthListener(): void {
    this._auth.authState.subscribe((user) => {
      if (user) {
        this._store.dispatch(new fromAuthActions.SetAuthenticated());
        this._router.navigate(['training']);
      } else {
        this._trainingService.cancelSubscriptions();
        this._store.dispatch(new fromAuthActions.SetUnanthenticated());
        this._router.navigate(['login']);
      }
    });
  }

  public registerUser(authData: AuthData): void {
    this._store.dispatch(new fromUIActions.StartLoading());
    this._auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch(new fromUIActions.StopLoading()))
      .catch((err) => this._manageError(err));
  }

  public login(authData: AuthData): void {
    this._store.dispatch(new fromUIActions.StartLoading());
    this._auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._store.dispatch(new fromUIActions.StopLoading()))
      .catch((err) => this._manageError(err));
  }

  public logout(): void {
    this._auth.signOut();
  }

  private _manageError(err: Error): void {
    this._uiService.showSnackBar(err.message, null, 3000);
    this._store.dispatch(new fromUIActions.StopLoading());
  }
}
