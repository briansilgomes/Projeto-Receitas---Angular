import { Component, OnInit } from '@angular/core';
import { Unitys } from 'src/app/class/unitys';
import { ServiceUnitysService } from 'src/app/services/service-unitys.service';

@Component({
  selector: 'app-unitys',
  templateUrl: './unitys.component.html',
  styleUrls: ['./unitys.component.css'],
})
export class UnitysComponent implements OnInit {
  title: string = 'Unidades de Medida';

  searchunity: string = '';
  unitys: Unitys[] = [];
  menssage: string = '';

  constructor(private serviceUnity: ServiceUnitysService) {
    this.getUnity();
  }

  ngOnInit(): void {}

  getUnity() {
    this.serviceUnity.getUnitys().subscribe(
      (response) => {
        this.unitys = response;
        if (this.unitys.length == 0)
        this.menssage ='Neste momento, não existem unidades!';
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  serachUnity() {
    this.menssage = '';
    if (this.searchunity == '') {
      return this.getUnity();
    }

    this.serviceUnity.getSearch(this.searchunity).subscribe(
      (response) => {
        this.unitys = response;
        if (this.unitys.length == 0)
          this.menssage =
            'Não existem ingredientes para a pesquisa pretendida!';
      },
      (error) => {
        this.menssage = error;
      }
    );
  }
}
