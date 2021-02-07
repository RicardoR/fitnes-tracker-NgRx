import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';

import { StoreModule } from '@ngrx/store';

import { AuthService } from './auth/auth.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';
import { reducers } from './app.reducer';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    // Application
    AuthModule,

    // Angular
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Angular material
    MaterialModule,

    // NgRxjs
    StoreModule.forRoot(reducers),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
