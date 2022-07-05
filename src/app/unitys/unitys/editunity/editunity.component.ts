import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Unitys } from 'src/app/class/unitys';
import { ServiceUnitysService } from 'src/app/services/service-unitys.service';

@Component({
  selector: 'app-editunity',
  templateUrl: './editunity.component.html',
  styleUrls: ['./editunity.component.css'],
})
export class EditunityComponent implements OnInit {
  title: string = 'Editar Unidade de Medida';
  unity = new Unitys(0, '', '');
  menssage: string = '';
  menssageerror: string = '';

  constructor(
    private serviceunity: ServiceUnitysService,
    private router: Router,
    private ativateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ativateRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getUnityId(id);
    });
  }

  getUnityId(id: number) {
    this.serviceunity.getUnityId(id).subscribe(
      (response) => {
        this.unity.idunity = response.idunity;
        this.unity.nameunity = response.nameunity;
        this.unity.siglaunity = response.siglaunity;
      },

      (error) => {
        this.menssageerror = error;
      }
    );
  }

  onSubmit() {
    this.serviceunity.validateUnity(this.unity).subscribe((response) => {
      if (response != null) {
        return (this.menssageerror = 'Unidade de medida já existe');
      }

      return this.serviceunity.editUnity(this.unity).subscribe(
        (response) => {
          this.menssage = 'Unidade de Medida editada com sucesso!';
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
