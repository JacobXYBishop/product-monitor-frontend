import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {NavigationExtras, Router} from '@angular/router';

import {LoginDatabase} from '../../login.database';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  userName: string;
  passWord: string;

  constructor(public authService: AuthService,
              public router: Router) {

  }

  setMessage() {
    this.message = `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`;
  }

  login(userName: string, passWord: string) {
    this.message = 'Trying to log in ...';

    if (Object.keys(LoginDatabase).includes(userName)) {
      if (passWord === LoginDatabase[userName]) {
        this.rLogin();
      }
    } else {
      this.message = 'Please check username or password!!!';
    }
  }

  rLogin() {
    this.authService.login().subscribe(() => {
        this.setMessage();
        if (this.authService.isLoggedIn) {
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';

          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };

          this.router.navigate([redirect], navigationExtras);
        }
      }
    );
  }
}
