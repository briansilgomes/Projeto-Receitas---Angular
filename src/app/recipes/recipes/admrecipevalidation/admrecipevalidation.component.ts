import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/class/recipes';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';

@Component({
  selector: 'app-admrecipevalidation',
  templateUrl: './admrecipevalidation.component.html',
  styleUrls: ['./admrecipevalidation.component.css']
})
export class AdmrecipevalidationComponent implements OnInit {

  title:string = 'Validar Receitas';
  estado:string ="Validar";

  recipes:Recipes[] = [];

  menssage:string = "";

  constructor(private serviceRecipe:ServiceRecipesService) { 
    this.getRecipeValidate();
    localStorage.setItem("tarefa","validaterecipe");
  }

  ngOnInit(): void {
  }

  //List - Receitas por Validar
  getRecipeValidate(){
  
    this.serviceRecipe.getRecipeValidate()
    .subscribe(
      (response) => {
        this.recipes = response;
        if (this.recipes.length == 0 ){this.menssage = "Não existe receitas para serem validas."}
      },
      (error) => {this.menssage = error;})
  }

  //Validar a Receita
  validateRecipe(recipe:Recipes){
    
    this.serviceRecipe.validateRecipe(recipe)
    .subscribe(

      (response) => {
        for( var i = 0; i < this.recipes.length; i++){ 
          if (this.recipes[i].idrecipe == recipe.idrecipe){this.recipes.splice(i,1)}
        }
        if (this.recipes.length == 0 ){this.menssage = "Não existe receitas para serem validas."}
      },
      (error) => {this.menssage = error;})
  }

  

}
