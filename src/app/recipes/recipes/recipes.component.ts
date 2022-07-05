import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/class/category';
import { Recipes } from 'src/app/class/recipes';
import { ServiceCategoryService } from 'src/app/services/service-category.service';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  title: string = "Receitas"
  menssage: string = "";
  recipes: Recipes[] = [];
  category: Category[] = [];
  selectcategory: number = 0;
  searchname: string = "";

  constructor(
    public serviceRecipe: ServiceRecipesService,
    public serviceCategory: ServiceCategoryService) {
    this.getRecipe();
    this.getCategory();
  }

  ngOnInit(): void {
  }

  //List - Receitas
  getRecipe() {
    this.serviceRecipe.getRecipes()
      .subscribe(
        (response) => {this.recipes = response;},
        (error) => {this.menssage = error;})
  }

  //List - Categorias
  getCategory() {
    this.serviceCategory.getCategory()
      .subscribe(
        (response) => {this.category = response;},
        (error) => {this.menssage = error;}
      )
  }

  //List - Filtro por Categoria
  orderby() {

   this.menssage ="";
   this.searchname ="";
   this.serviceRecipe.orderbyRecipeCategory(this.selectcategory)
      .subscribe(
        (response) => {
          this.recipes = response;
          if (this.recipes.length == 0) {this.menssage = 'Não existem receitas para a categoria selecionada!'}
        },
        (error) => {this.menssage = error;})
  }

  //Pesquisa de receitas
  searchNameRecipe() {

    this.menssage ="";
    if (this.searchname == "") {return this.getRecipe();}

    this.serviceRecipe.searchNameRecipe(this.searchname)
      .subscribe(
        (response) => {
          this.recipes = response;
          if (this.recipes.length == 0) {this.menssage = 'Não existem receitas para a pesquisa pretendida!'}},
        (error) => {this.menssage = error;})

  }

}
