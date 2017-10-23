import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService,
              public router: Router) {

  }

  setMessage() {
    this.message = `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`;
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/login';

        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
