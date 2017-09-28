/**
 * Created by jacob on 9/26/2017.
 */

import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preLoadedModules: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preLoadedModules.push(route.path);
      // console.log(`Pre loaded: ${route.path}`);
      return load();
    } else {
      return Observable.of(null);
    }
  }
}
