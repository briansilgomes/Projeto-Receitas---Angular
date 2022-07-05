import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { ServiceUsersService } from 'src/app/services/service-users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  title: string = 'Utilizadores';
  menssage: string = '';
  searchuser: string = '';

  emaillogin = localStorage.getItem('user');
  iduserlogin = environment.iduser;

  users: User[] = [];

  constructor(private serviceUser: ServiceUsersService) {
    this.getUser();
  }

  ngOnInit(): void {}

  getUser() {
    this.serviceUser.getUser().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  serachUser() {
    this.menssage == '';
    if (this.searchuser == '') return this.getUser();

    this.serviceUser.getSearch(this.searchuser).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  lookUser(user: User) {
    this.serviceUser.lookUser(user).subscribe(
      (response) => {
        user.state = 'Bloqueado';
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  unLookUser(user: User) {
    this.serviceUser.unLookUser(user).subscribe(
      (response) => {
        user.state = 'Ativo';
      },
      (error) => {
        this.menssage = error;
      }
    );
  }
}
