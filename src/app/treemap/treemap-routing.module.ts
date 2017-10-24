import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TreemapComponent} from './treemap/treemap.component';

const treemapRoutes: Routes = [
  {path: 'treemap', component: TreemapComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(treemapRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TreemapRoutingModule {
}
