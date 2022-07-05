import { Component, OnInit } from '@angular/core';

import { Recipes } from '../../class/recipes';
import { ServiceRecipesService } from '../../services/service-recipes.service';

@Component({
  selector: 'app-userrecipe',
  templateUrl: './userrecipe.component.html',
  styleUrls: ['./userrecipe.component.css'],
})
export class UserrecipeComponent implements OnInit {
  title: string = 'AS MINHAS RECEITAS';

  recipe: Recipes[] = [];
  menssage: string = '';
  searchselected: number = 0;

  constructor(private serviceRecipe: ServiceRecipesService) {
    this.getRecipeUser();
  }

  ngOnInit(): void {}

  getRecipeUser() {
    this.serviceRecipe.getRecipeUser().subscribe(
      (response) => {
        this.recipe = response;
        this.disaplayMenssage();
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  disaplayMenssage() {
    if (this.recipe.length == 0) {
      this.menssage = 'Ainda não inseriu nenhuma receita.';
    }
  }

  orderbyState() {
    if (this.searchselected == 0) {
      return this.getRecipeUser();
    }

    this.serviceRecipe.orderbyState(this.searchselected).subscribe(
      (response) => {
        this.recipe = response;
      },

      (error) => {
        this.menssage = error;
      }
    );
  }
}
