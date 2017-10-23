import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  message: string;

  constructor(public authService: AuthService,
              public router: Router) {

  }

  setMessage() {
    this.message = `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`;
  }

  logout() {
    this.authService.logout();
    this.setMessage();

    const redirect = '/login';

    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    this.router.navigate([redirect], navigationExtras);
  }
}
