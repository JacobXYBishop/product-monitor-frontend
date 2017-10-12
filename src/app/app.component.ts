import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  routeLinks: any[];
  activeLinkIndex = 0;
  clock: Date;

  // dateFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }

  constructor(private router: Router) {
    this.routeLinks = [
      {label: 'Account', link: '/account'},
      {label: 'Position', link: '/position'},
      // {label: 'Build', link: '/build'},
    ];

    this.activeLinkIndex = this.routeLinks
      .indexOf(this.routeLinks.find(tab => router.url.indexOf(tab.link) !== -1));

    const stationDate = new Date();

    setInterval(() => {
      this.clock = new Date(stationDate.setSeconds(stationDate.getSeconds() + 1))
    }, 1000);
  }
}
