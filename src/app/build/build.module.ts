import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {BuildService} from './build.service';
import {BuildComponent} from './build/build.component';
import {BuildRoutingModule} from './build-routing.module';

import {MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    MatSortModule,
    BrowserModule,
    MatTableModule,
    MatInputModule,
    CdkTableModule,
    MatPaginatorModule,
    BuildRoutingModule
  ],
  declarations: [
    BuildComponent
  ],
  providers: [
    // BuildService
  ]
})
export class BuildModule {
}
