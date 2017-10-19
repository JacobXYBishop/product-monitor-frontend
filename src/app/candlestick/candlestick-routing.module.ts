import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CandlestickComponent} from './candlestick/candlestick.component';

const candlestickRoutes: Routes = [
  {path: 'candlestick', component: CandlestickComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(candlestickRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CandlestickRoutingModule {
}
