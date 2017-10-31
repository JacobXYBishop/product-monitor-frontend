import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SummaryComponent} from './summary/summary.component';


const summaryRoutes: Routes = [
  {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(summaryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SummaryRoutingModule {
}
