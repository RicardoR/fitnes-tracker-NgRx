import { Subscription } from 'rxjs/Subscription';
import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoading = false;

  private _loadingSubs: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this._loadingSubs = this._uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  public onSubmit(): void {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }

  public ngOnDestroy(): void {
    this._loadingSubs.unsubscribe();
  }
}
