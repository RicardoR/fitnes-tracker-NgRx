import { AuthService } from 'src/app/auth/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) {}
  public ngOnInit(): void {
    this._authService.initAuthListener();
  }
}
