import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/class/ingredient';
import { ServiceIngredientsService } from 'src/app/services/service-ingredients.service';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css'],
})
export class IngredientesComponent implements OnInit {
  title: string = 'Ingredientes';
  searchingre: string = '';

  ingredients: Ingredient[] = [];
  menssageerror: string = '';

  constructor(private serviceIngredients: ServiceIngredientsService) {
    this.getIngredient();
  }

  ngOnInit(): void {}

  getIngredient() {
    this.serviceIngredients.getIngredient().subscribe(
      (data) => {
        this.ingredients = data;
        if (this.ingredients.length == 0)
        this.menssageerror ='Neste momento, não existem ingredientes!';
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }

  serachIngredient() {
    this.menssageerror = '';

    if (this.searchingre == '') {
      return this.getIngredient();
    }

    this.serviceIngredients.getIngredientSearch(this.searchingre).subscribe(
      (data) => {
        this.ingredients = data;
        if (this.ingredients.length == 0)
          this.menssageerror ='Não existem ingredientes para a pesquisa pretendida!';
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }
}
