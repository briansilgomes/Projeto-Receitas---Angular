import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projetoreceitas';

  constructor(
    private authservice:AuthService,
   
  ) {
    this.authservice.logout();
   }

  
}

