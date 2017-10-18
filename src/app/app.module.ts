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
import {ChartsModule} from './charts/charts.module';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
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
    ChartsModule,

    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
