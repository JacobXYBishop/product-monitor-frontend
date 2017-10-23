import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login/login.component';

import {MatButtonModule, MatInputModule} from '@angular/material';

import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
