import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { State, getIsAuth } from '../../app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  private sidenavToggle = new EventEmitter<void>();

  public isAuth$: Observable<boolean>;

  constructor(
    private _authService: AuthService,
    private _store: Store<State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(getIsAuth);
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }
}
