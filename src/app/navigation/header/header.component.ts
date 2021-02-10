import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRootReducer from '../../app.reducer';

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
    private _store: Store<fromRootReducer.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this._store.select(fromRootReducer.getIsAuth);
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }
}
