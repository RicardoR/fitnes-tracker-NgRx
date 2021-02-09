import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import * as fromRootReducer from './../../app.reducer';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;
  public maxDate;
  public signUpForm: FormGroup;

  private _loadingSubs: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store<fromRootReducer.State>
  ) {}

  ngOnInit(): void {
    this._buildForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.isLoading$ = this._store.select(fromRootReducer.getIsLoading);
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
