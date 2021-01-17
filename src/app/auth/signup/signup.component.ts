import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public maxDate;
  public signUpForm: FormGroup;
  constructor(private _fb: FormBuilder) {}

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
    console.log(this.signUpForm);
  }
}
