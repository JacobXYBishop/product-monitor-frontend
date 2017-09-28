import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';

import {MdTabsModule} from '@angular/material';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AccountModule} from './account/account.module';
import {PositionModule} from './position/position.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdTabsModule,
    AccountModule,
    PositionModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
