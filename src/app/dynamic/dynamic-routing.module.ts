import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicComponent} from './dynamic/dynamic.component';

const dynamicRoutes: Routes = [
  {path: 'dynamic', component: DynamicComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(dynamicRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DynamicRoutingModule {
}
