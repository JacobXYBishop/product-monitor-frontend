import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionComponent} from './position/position.component';

const positionRoutes: Routes = [
  {path: 'position', component: PositionComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(positionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PositionRoutingModule {
}
