import { UIService } from './../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public maxDate;
  public signUpForm: FormGroup;

  private _loadingSubs: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _uiService: UIService
  ) {}

  ngOnInit(): void {
    this._buildForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this._loadingSubs = this._uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  private _buildForm(): void {
    this.signUpForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      agree: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this._authService.registerUser({
      email: this.signUpForm.controls.email.value,
      password: this.signUpForm.controls.password.value,
    });
  }

  public ngOnDestroy(): void {
    if (this._loadingSubs) {
      this._loadingSubs.unsubscribe();
    }
  }
}
