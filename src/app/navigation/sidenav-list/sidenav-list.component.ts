import { Subscription } from 'rxjs/Subscription';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public logout(): void {
    this.onToggleSidenav();
    this._authService.logout();
  }
}
