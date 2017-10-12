import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {PositionComponent} from './position/position.component';
import {PositionService} from './position.service';
import {PositionRoutingModule} from './position-routing.module';

import {MatButtonModule, MatGridListModule, MatRadioModule, MatSelectModule, MatTableModule} from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PositionRoutingModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatGridListModule
  ],
  declarations: [
    PositionComponent
  ],
  providers: [
    PositionService
  ]
})
export class PositionModule {
}
