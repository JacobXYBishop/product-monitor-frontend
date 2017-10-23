import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MatTabsModule} from '@angular/material';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {AccountModule} from './account/account.module';
import {PositionModule} from './position/position.module';
import {BuildModule} from './build/build.module';
import {CandlestickModule} from './candlestick/candlestick.module';

import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login/login.component';
import {LoginRoutingModule} from './login/login-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatInputModule,

    AccountModule,
    PositionModule,
    BuildModule,
    CandlestickModule,
    LoginRoutingModule,

    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
