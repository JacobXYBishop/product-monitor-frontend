import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeatmapComponent} from './heatmap/heatmap.component';

const heatmapRoutes: Routes = [
  {path: 'heatmap', component: HeatmapComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(heatmapRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeatmapRoutingModule {
}
