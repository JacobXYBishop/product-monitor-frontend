import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/account',
    pathMatch: 'full'
  },
  {
    path: 'position',
    redirectTo: '/position',
    pathMatch: 'full'
  },
  {
    path: 'build',
    redirectTo: '/build',
    pathMatch: 'full'
  },
  {
    path: 'candlestick',
    redirectTo: '/candlestick',
    pathMatch: 'full'
  },
  {
    path: 'heatmap',
    redirectTo: '/heatmap',
    pathMatch: 'full'
  },
  {
    path: 'treemap',
    redirectTo: '/treemap',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        preloadingStrategy: SelectivePreloadingStrategy,
      }
    )
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule {
}
