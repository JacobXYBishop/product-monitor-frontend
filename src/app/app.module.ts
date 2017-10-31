import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {AccountModule} from './account/account.module';
import {PositionModule} from './position/position.module';
import {SummaryModule} from './summary/summary.module';
import {BuildModule} from './build/build.module';
import {CandlestickModule} from './candlestick/candlestick.module';
import {HeatmapModule} from './heatmap/heatmap.module';
import {TreemapModule} from './treemap/treemap.module';
import {DynamicModule} from './dynamic/dynamic.module';
import {LoginModule} from './login/login.module';
import {LoginRoutingModule} from './login/login-routing.module';

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
    MatToolbarModule,

    AccountModule,
    PositionModule,
    SummaryModule,
    BuildModule,
    CandlestickModule,
    HeatmapModule,
    TreemapModule,
    DynamicModule,
    LoginModule,
    LoginRoutingModule,

    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
