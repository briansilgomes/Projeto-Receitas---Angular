import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Login } from '../class/login';
import { ServiceUsersService } from '../services/service-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: string = 'Login';
  login = new Login('', '');
  menssage: string = '';

  constructor(
    private userService: ServiceUsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.userService.loginUser(this.login).subscribe(
      (response) => {
        if (response.idstate == 1) {
          this.menssage = 'Utilizador Bloqueado ! Contacte um administrador.';
        } else {
          localStorage.setItem('user', response.emailuser);
          localStorage.setItem('perm', response.idpermission);
          environment.iduser = response.iduser;
          this.router.navigate(['recipes']);
        }
      },
      (error) => {
        this.menssage = 'Credênciais não validas!';
      }
    );
  }

  clean() {
    this.menssage = '';
  }
}
