import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  routeLinks: any[];
  activeLinkIndex = 0;
  clock = Observable.interval(1000).map(() => new Date());

  // dateFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }

  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Account', link: '/account', disabled: false},
      {label: 'Position', link: '/position', disabled: false},
      {label: 'Admin', link: '/admin', disabled: false},
      {label: 'Build', link: '/build', disabled: true},
      {label: 'Candlestick', link: '/candlestick', disabled: false},
      {label: 'Heatmap', link: '/heatmap', disabled: false},
      {label: 'Treemap', link: '/treemap', disabled: false},
    ];

    this.activeLinkIndex = this.routeLinks
      .indexOf(this.routeLinks.find(tab => router.url.indexOf(tab.link) !== -1));
  }
}
