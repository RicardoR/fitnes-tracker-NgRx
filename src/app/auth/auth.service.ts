import { UIService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private _isAuthenticated = false;
  public authChange = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _auth: AngularFireAuth,
    private _trainingService: TrainingService,
    private _uiService: UIService
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
    this._uiService.loadingStateChanged.next(true);

    this._auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._uiService.loadingStateChanged.next(false))
      .catch((err) => this._manageError(err));
  }

  public login(authData: AuthData): void {
    this._uiService.loadingStateChanged.next(true);
    this._auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this._uiService.loadingStateChanged.next(false))
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
    this._uiService.loadingStateChanged.next(false);
  }
}
