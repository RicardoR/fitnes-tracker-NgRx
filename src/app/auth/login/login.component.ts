import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this._authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
