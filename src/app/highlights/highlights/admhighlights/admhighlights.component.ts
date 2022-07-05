import { Component, OnInit } from '@angular/core';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';

import { Highlight } from '../../../class/highlight';
import { Recipes } from '../../../class/recipes';
import { ServiceHighlightsService } from '../../../services/service-highlights.service';

@Component({
  selector: 'app-admhighlights',
  templateUrl: './admhighlights.component.html',
  styleUrls: ['./admhighlights.component.css'],
})
export class AdmhighlightsComponent implements OnInit {
  title: string = 'Destaques';

  recipe: Recipes[] = [];
  highlight = new Highlight(0, 0);

  menssage: string = '';
  menssageerror: string = '';

  count: number = 0;

  searchrecipe: string = '';

  constructor(
    private serviceHighlights: ServiceHighlightsService,
    private serviceRecipe: ServiceRecipesService
  ) {
    this.getRecipe();
    this.getHighlights();
  }

  ngOnInit(): void {}

  getRecipe() {
    this.serviceHighlights.getRecipesAdm().subscribe(
      (response) => {
        this.recipe = response;
        if (this.recipe.length==0) this.menssage = "Não exitem receitas para destacar."
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }

  //Devolve quantas receitas estão nos destaques
  getHighlights() {
    this.serviceHighlights.getRecipes().subscribe(
      (response) => {
        this.count = response.length;
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }

  //Destacar Receita
  sendHighlights(recipe: Recipes) {
    if (this.count < 5) {
      this.cleanMessage();
      
      this.highlight.idrecipe = recipe.idrecipe;

      this.serviceHighlights.sendHighlights(this.highlight).subscribe(
        (response) => {
          this.count = this.count + 1;
          recipe.highlight = 1;
        },
        (error) => {
          this.menssageerror = error;
        }
      );
    } else {
      this.menssageerror =
        'Só é permitido adicionar no máximo 5 receitas aos destaques!';
    }
  }

  //Remover Destaque
  removeHighlights(recipe: Recipes) {
    this.cleanMessage()
    this.serviceHighlights.removeHighlights(recipe).subscribe(
      (response) => {
        recipe.highlight = 0;
        this.count = this.count - 1;
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }

  //Procurar Receita
  serchRecipe() {
    this.cleanMessage();

    if (this.searchrecipe == '') {
      return this.getRecipe();
    }

    this.serviceRecipe.searchNameRecipe(this.searchrecipe).subscribe(
      (response) => {
        this.recipe = response;
        if (this.recipe == null) {
          this.menssage = 'Não existem receitas para a pesquisa pretendida!';
        }
      },
      (error) => {
        this.menssageerror = error;
      }
    );
  }

  cleanMessage() {
    this.menssage = '';
    this.menssageerror = '';
  }
}
