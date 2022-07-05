import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipemaster } from 'src/app/class/recipemaster';
import { Temp } from 'src/app/class/temp';
import { Templist } from 'src/app/class/templist';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';
import { environment } from 'src/environments/environment';

import { Category } from '../../../class/category';
import { Difficulty } from '../../../class/difficulty';
import { Ingredient } from '../../../class/ingredient';
import { Unitys } from '../../../class/unitys';
import { ServiceCategoryService } from '../../../services/service-category.service';
import { ServiceDifficultyService } from '../../../services/service-difficulty.service';
import { ServiceIngredientsService } from '../../../services/service-ingredients.service';
import { ServiceUnitysService } from '../../../services/service-unitys.service';

@Component({
  selector: 'app-recipesadd',
  templateUrl: './recipesadd.component.html',
  styleUrls: ['./recipesadd.component.css']
})
export class RecipesaddComponent implements OnInit {

  title = "Nova Receita"
  menssage:string = "";
  addmenssage:string = "";

  category: Category[] = []
  difficult: Difficulty[] = []
  ingredient: Ingredient[] = []
  unity: Unitys[] = []
  listemp: Templist[] = []


  addrecipe = new Recipemaster (0,'','',0,0,environment.iduser,7,0,'',new Date())
  addingredientrecipe= new Temp(0,environment.iduser,0,0,0)
  inlist:boolean = false


  constructor(
    private servicecategory: ServiceCategoryService,
    private serviceDifficulty: ServiceDifficultyService,
    private serviceIngredient: ServiceIngredientsService,
    private serviceUnity: ServiceUnitysService,
    private serviceRecipe: ServiceRecipesService,
    private http: HttpClient,
    private router: Router) {
    this.getCategory(),
    this.getDifficulty(),
    this.getIngredient(),
    this.getUnity(),
    this.removeAll()
  }

  ngOnInit(): void {
  }

  getCategory() {
    this.servicecategory.getCategory()
    .subscribe(
      (response) => {
        this.category = response;
      },
      (error) => {
        this.menssage = error;
      }
      )

  }

  getDifficulty() {
    this.serviceDifficulty.getDifficulty()
    .subscribe(
      (response) => {
        this.difficult = response;
      },
      (error) => {
        this.menssage = error;
      }
      );
  }

  getIngredient() {
    this.serviceIngredient.getIngredient().subscribe(dados => this.ingredient = dados);
  }

  getUnity() {
    this.serviceUnity.getUnitys().subscribe(dados => this.unity = dados);
  }



  // Tabela temporaria de ingredientes/receitas
  getTemp(iduser:number){
   this.serviceIngredient.getTemp(iduser)
    .subscribe(
      (response) => {
       
        this.listemp = response;
      
      },
      (error) =>{
        this.menssage = error;
      }
    )
  }

  removeTemp(idtem:number){

    this.serviceIngredient.removeTemp(idtem)
    .subscribe(
      (response)=>{
        this.getTemp(environment.iduser);
      }
    )
  }

  removeAll(){


    this.serviceIngredient.removeAll()
    .subscribe(
      (response)=>{
       
      }
    )
  }

  addTemp(){

    console.log("temp: " + this.addingredientrecipe.idingredient)

    this.serviceIngredient.addTemp(this.addingredientrecipe)
    .subscribe(
      (response)=>{
        this.getTemp(this.addingredientrecipe.iduser);
        this.cleanTempForm();
      },
      (error)=>{
        this.menssage = error;
      }

    )
  

  
  }
 
  cleanTempForm(){
    this.addingredientrecipe= new Temp(0,environment.iduser,0,0,0);
    this.addmenssage = "";
  }
  

  formData = new FormData();
  onFileSelected(event:any) {

    const file:File = event.target.files[0];
  
    if (file) {
       this.addrecipe.imagerecipe = file.name;
       this.formData.append("files", file);
    }
}
  

//Adicionar receita
  onSubmit(){

 if (this.listemp.length == 0){
      this.addmenssage = "Tem de inserir ingredientes à receita!" 
      return
  }
  
  if ( this.addrecipe.imagerecipe == ""){
    this.addmenssage = "Tem de inserir uma imagem à receita" 
      return
  }

    this.serviceRecipe.addRecipe(this.addrecipe)
    .subscribe(
      (response) => {
        this.addmenssage = "Receita adicionada com sucesso! Aguarda aprovação por parte de um Administrador.";
  
       this.serviceIngredient.sendTempReal(response.idrecipe)
       .subscribe(
        (response) =>{
          this.onClean();

          setTimeout(() => {
            this.onClean();
            this.addmenssage = "";
            window.scroll(0,0);
        }, 2000);

        }
       )

       setTimeout(() => {
        this.router.navigateByUrl('/userrecipe');
      }, 2000);

      },
      (error) =>{
        this.menssage = error;
      }
    )

    this.uploadimage();

  }



  uploadimage(){

    const upload$ = this.http.post("http://localhost:5101/api/recipes/upload", this.formData);
    upload$.subscribe();

  }


  onClean(){
    this.addingredientrecipe= new Temp(0,environment.iduser,0,0,0)
    this.addrecipe = new Recipemaster (0,'','',0,0,environment.iduser,7,0,'',new Date())
    this.listemp = []
  }

  onCancel(){
    window.scroll(0,0);
    this.onClean();
  }



}
