import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usermaster } from 'src/app/class/usermaster';
import { environment } from 'src/environments/environment';

import { User } from '../../class/user';
import { ServiceUsersService } from '../../services/service-users.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent implements OnInit {
  title: string = 'Área Pessoal';
  user = new User(0, '', '', '', '', '');
  useredit = new Usermaster(0, '', '', '', '', 0, 0);

  menssage: string = '';
  erroremail: string = '';
  errorpassword: string = '';
  errorpasswordantiga: string = '';

  alterarpassword: boolean = false;

  confirmpass: string = '';
  antigapass: string = '';
  novapass: string = '';

  constructor(
    private serviceUser: ServiceUsersService,
    private router: Router
  ) {
    this.getHome();
    this.getEdit();
  }

  ngOnInit(): void {}

  getHome() {
    this.serviceUser.getHome(environment.iduser).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  getEdit() {
    this.serviceUser.getUserID(environment.iduser).subscribe(
      (response) => {
        this.useredit = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  //Verifica se o email já existe
  existUser() {
    if (this.useredit.emailuser == '') {
      return (this.erroremail = ''), (this.menssage = '');
    }
    if (this.useredit.emailuser == this.user.emailuser) {
      return (this.erroremail = '');
    }

    return this.serviceUser
      .getUserEmail(this.useredit.emailuser)
      .subscribe((response) => {
        if (response != null) {
          this.erroremail = 'O email inserido já existe!';
        } else {
          this.erroremail = '';
        }
      });
  }

  //Check - mostrar formulario para alterar
  ativar() {
    if (this.alterarpassword == false) {
      return (this.alterarpassword = true);
    }
    return (this.alterarpassword = false);
  }

  //Verificar password são iguais
  confirmpassword() {
    if (this.confirmpass == '') {
      return (this.errorpassword = '');
    }
    if (this.novapass != this.confirmpass) {
      return (this.errorpassword = 'As passwords não coincidem');
    }
    this.errorpassword = '';
    return (this.useredit.passworduser = this.novapass);
  }

  //Verificar password é atual
  atualpassword() {
    if (this.antigapass == '') {
      return (this.errorpasswordantiga = '');
    }
    if (this.useredit.passworduser != this.antigapass) {
      return (this.errorpasswordantiga = 'As passwords não é a atual');
    }
    return (this.errorpasswordantiga = '');
  }

  onSubmit() {
    if (
      this.erroremail != '' ||
      this.errorpassword != '' ||
      this.errorpasswordantiga != ''
    ) {
      return (this.menssage = 'Exitem campos inválidos!');
    }

    return this.serviceUser.editUser(this.useredit).subscribe((response) => {
      (this.menssage = 'Dados alterados com sucesso.'), this.logout();

      setTimeout(() => {
        this.router.navigateByUrl('login');
      }, 2000);
    });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('perm');
    localStorage.removeItem('tarefa');
  }

  onCancel() {}
}
