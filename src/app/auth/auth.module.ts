import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    // Angular
    AngularFireAuthModule,

    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
