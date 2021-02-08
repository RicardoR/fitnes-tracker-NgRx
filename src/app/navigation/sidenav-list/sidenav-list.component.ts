import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { getIsAuth, State } from './../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
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

  public logout(): void {
    this.onToggleSidenav();
    this._authService.logout();
  }
}
