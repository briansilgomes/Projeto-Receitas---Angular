import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favoritemaster } from 'src/app/class/favoritemaster';
import { Recipeingredient } from 'src/app/class/recipeingredient';
import { Recipes } from 'src/app/class/recipes';
import { ServiceCommentsService } from 'src/app/services/service-comments.service';
import { ServiceFavoriteService } from 'src/app/services/service-favorite.service';
import { ServiceIngredientsService } from 'src/app/services/service-ingredients.service';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css'],
})
export class RecipedetailsComponent implements OnInit {
  /* Titles */
  preparation: string = 'MODO PREPARAÇÃO';
  ingredients: string = 'INGREDIENTES';
  userlogado: boolean = false;
  menssage: string = '';

  recipe = new Recipes(0, '', '', '', '', '', '', '', '', 0, 0, new Date(), 0);
  ingredientrecipe: Recipeingredient[] = [];

  permission = localStorage.getItem('perm');

  existefavorite: boolean = false;
  idrecipe: number = 0;
  classification: number = 0;

  constructor(
    private ativateRoute: ActivatedRoute,
    private serviceRecipe: ServiceRecipesService,
    private serviceIngredient: ServiceIngredientsService,
    private serviceFavorite: ServiceFavoriteService,
    private serviceComment: ServiceCommentsService
  ) {}

  ngOnInit(): void {
    this.ativateRoute.params.subscribe((params) => {
      this.idrecipe = params['id'];
      this.getRecipeId(this.idrecipe);
      this.getIngredientRecipe(this.idrecipe);
      this.checkFavorite(this.idrecipe);
      this.getClassification(this.idrecipe);
      this.userLogado();
    });
  }

  //Dados da Receita
  getRecipeId(id: number) {
    return this.serviceRecipe.getRecipeId(id).subscribe(
      (response) => {
        this.recipe = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  //Ingrediente da Receita
  getIngredientRecipe(id: number) {
    return this.serviceIngredient.getIngredientRecipe(id).subscribe(
      (response) => {
        this.ingredientrecipe = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

   //Classificação Receita
   getClassification(id: number) {
    return this.serviceComment.getClassification(id).subscribe(
      (response) => {
        this.classification = response.mediaclassification;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  //Utilizador Logado?
  userLogado() {
    if (localStorage.getItem('user') != null) { return this.userlogado = true;}
    return this.userlogado = false;
  }
  
  tipoLocal() {
    localStorage.setItem('tarefa', 'admrecipe');
  }


  //FAVORITOS
  fav = new Favoritemaster(0, 0, 0);
  checkFavorite(idreceipe: number) {
    this.serviceFavorite.checkFavorite(idreceipe).subscribe(
      (response) => {
        this.fav = response;
        if (response != null) { this.existefavorite = true;} else { this.existefavorite = false };
      },

      (error) => {
        this.menssage = error;
      }
    );
  }
  //Adicionar Favorito
  addFavorite(idrecipe: number) {
    this.fav = new Favoritemaster(0, idrecipe, environment.iduser);

    this.serviceFavorite.addFavorite(this.fav).subscribe(
      (response) => {
        this.existefavorite = true;
        this.checkFavorite(response.idrecipe);
      },

      (error) => {
        this.menssage = error;
      }
    );
  }
  //Remover Favorito
  removeFavorite(idrecipe: number) {
    console.log("idrecipe remove - " + idrecipe)
    this.checkFavorite(idrecipe);
    this.serviceFavorite.removeFavorite(this.fav.idfavorite).subscribe(
      (response) => {this.existefavorite = false;},
      (error) => {this.menssage = error;}
    );
  }
}
