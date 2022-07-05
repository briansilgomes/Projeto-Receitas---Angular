import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css'],
})
export class UsermenuComponent implements OnInit {
  permission = localStorage.getItem('perm');

  constructor(private authservice: AuthService, private route: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authservice.logout();
    this.route.navigate(['']);
  }
}
