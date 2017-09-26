import {Component} from '@angular/core';
import {AccountService} from './account-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AccountService]
})
export class AppComponent {
  title = 'Product Monitor';
}
