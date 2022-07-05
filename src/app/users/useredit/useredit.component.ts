import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/class/permission';
import { State } from 'src/app/class/state';
import { Usermaster } from 'src/app/class/usermaster';
import { ServicePermissionService } from 'src/app/services/service-permission.service';
import { ServiceStateService } from 'src/app/services/service-state.service';
import { ServiceUsersService } from 'src/app/services/service-users.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
})
export class UsereditComponent implements OnInit {
  title: string = 'Editar Utilizador';
  menssage: string = '';
  erroremail: string = '';
  errorpassword: string = '';
  confirmpass: string = '';

  listusers = new Usermaster(
    0,
    '',
    '',
    'assets/imagepage/userimage.jpg',
    '',
    0,
    0
  );
  userpermission = localStorage.getItem('perm');
  permission: Permission[] = [];
  state: State[] = [];

  constructor(
    private ativateRoute: ActivatedRoute,
    private servicePermission: ServicePermissionService,
    private serviceState: ServiceStateService,
    private serviceUser: ServiceUsersService,
    private router: Router
  ) {
    this.getPermission();
    this.getState();
  }

  ngOnInit(): void {
    this.ativateRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getUserID(id);
    });
  }

  getUserID(iduser: number) {
    this.serviceUser.getUserID(iduser).subscribe((response) => {
      this.listusers = response;
    });
  }

  getPermission() {
    this.servicePermission.getPermission().subscribe(
      (response) => {
        this.permission = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  getState() {
    this.serviceState.getState().subscribe(
      (response) => {
        this.state = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  existUser() {
    if (this.listusers.emailuser == '') {
      this.erroremail = '';
    } else {
      this.serviceUser
        .getUserEmail(this.listusers.emailuser)
        .subscribe((response) => {
          if (response != null) {
            this.erroremail = 'O email inserido já existe!';
          } else {
            this.erroremail = '';
          }
        });
    }
  }

  confirmpassword() {
    if (this.listusers.passworduser != this.confirmpass) {
      this.errorpassword = 'As passwords não coincidem';
    } else {
      this.errorpassword = '';
    }
  }

  onSubmit() {
    if (this.erroremail != '' || this.errorpassword != '') {
      this.menssage = 'Exitem campos inválidos!';
    } else {
      if (localStorage.getItem('user') == null) {
        this.listusers.idpermission = 2;
        this.listusers.idstate = 8;
      }

      this.serviceUser.editUser(this.listusers).subscribe(
        (response) => {
          this.menssage = 'Utilizador editado com sucesso!';

          setTimeout(() => {
            this.router.navigateByUrl('/admusers');
          }, 2000);
        },
        (error) => {
          this.menssage = error;
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['admusers']);
  }
}
