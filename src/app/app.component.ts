import { Component } from '@angular/core';
import { SITE_NAME } from './config/config.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = SITE_NAME;
}
