import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unitys } from 'src/app/class/unitys';
import { ServiceUnitysService } from 'src/app/services/service-unitys.service';

@Component({
  selector: 'app-addunity',
  templateUrl: './addunity.component.html',
  styleUrls: ['./addunity.component.css'],
})
export class AddunityComponent implements OnInit {
  title: string = 'Adicionar Unidade de Medida';
  unity = new Unitys(0, '', '');
  menssage: string = '';
  menssageerror: string = '';

  constructor(
    private serviceunity: ServiceUnitysService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.serviceunity.validateUnity(this.unity).subscribe((response) => {
      if (response != null) {
        return (this.menssageerror = 'Unidade de medida já existe');
      }

      return this.serviceunity.createUnity(this.unity).subscribe(
        (response) => {
          this.menssage = 'Unidade de Medida adicionado com sucesso!';
          setTimeout(() => {
            this.router.navigateByUrl('/unitys');
          }, 2000);
        },

        (error) => {
          this.menssageerror = error;
        }
      );
    });
  }

  onCancel() {
    this.router.navigateByUrl('/unitys');
  }

  clean() {
    this.menssage = '';
    this.menssageerror = '';
  }
}
