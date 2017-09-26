import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {AccountService} from './account-info.service';
import {HttpModule} from '@angular/http';

import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatTableModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
