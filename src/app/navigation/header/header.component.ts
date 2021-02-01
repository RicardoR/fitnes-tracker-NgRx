import { AuthService } from './../../auth/auth.service';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  private sidenavToggle = new EventEmitter<void>();
  private _authSubscription: Subscription;

  public isAuth = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authSubscription = this._authService.authChange.subscribe(
      (authStatus: boolean) => (this.isAuth = authStatus)
    );
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    if (this._authSubscription) {
      this._authSubscription.unsubscribe();
    }
  }
}
