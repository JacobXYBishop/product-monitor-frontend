import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionComponent} from './position/position.component';
import {PositionService} from './position.service';
import {PositionRoutingModule} from './position-routing.module';

import {MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PositionRoutingModule,
    MatTableModule
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
