import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';

export class AuthService {
  private _user: User;
  public authChange = new Subject<boolean>();

  public registerUser(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authChange.next(true);
  }

  public login(authData: AuthData): void {
    this._user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString(),
    };
    this.authChange.next(true);
  }

  public logout(): void {
    this._user = null;
    this.authChange.next(false);
  }

  public getUser(): User {
    return { ...this._user };
  }

  public isAuth(): boolean {
    return this._user != null;
  }
}
