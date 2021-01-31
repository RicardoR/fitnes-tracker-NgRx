import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public maxDate;
  public signUpForm: FormGroup;
  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this._buildForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
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
}
