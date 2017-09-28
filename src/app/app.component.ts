import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Account', link: '/account'},
      {label: 'Position', link: '/position'}
    ];
    this.activeLinkIndex = this.routeLinks
      .indexOf(this.routeLinks.find(tab => router.url.indexOf(tab.link) !== -1));
  }
}
