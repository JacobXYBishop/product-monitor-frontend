import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BuildComponent} from './build/build.component';

const buildRoutes: Routes = [
  {path: 'build', component: BuildComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(buildRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuildRoutingModule {
}
