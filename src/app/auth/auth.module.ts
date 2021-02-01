import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireAuthModule,

    MaterialModule,
  ],
})
export class AuthModule {}
