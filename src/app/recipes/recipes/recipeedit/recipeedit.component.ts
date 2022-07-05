import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/class/category';
import { Difficulty } from 'src/app/class/difficulty';
import { Ingredient } from 'src/app/class/ingredient';
import { Recipemaster } from 'src/app/class/recipemaster';
import { Temp } from 'src/app/class/temp';
import { Templist } from 'src/app/class/templist';
import { Unitys } from 'src/app/class/unitys';
import { ServiceCategoryService } from 'src/app/services/service-category.service';
import { ServiceDifficultyService } from 'src/app/services/service-difficulty.service';
import { ServiceIngredientsService } from 'src/app/services/service-ingredients.service';
import { ServiceRecipesService } from 'src/app/services/service-recipes.service';
import { ServiceUnitysService } from 'src/app/services/service-unitys.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipeedit',
  templateUrl: './recipeedit.component.html',
  styleUrls: ['./recipeedit.component.css']
})
export class RecipeeditComponent implements OnInit {

  recipe = new Recipemaster (0,'','',0,0,0,0,0,'',new Date);
 
  title = "Editar Receita"
  menssage:string = "";
  addmenssage:string = "";

  category: Category[] = []
  difficult: Difficulty[] = []
  ingredient: Ingredient[] = []
  unity: Unitys[] = []
  listemp: Templist[] = []
  idrecipe:number = 0;

  tipopagina = localStorage.getItem("tarefa")


  addrecipe = new Recipemaster (0,'','',0,0,environment.iduser,7,0,'assets/imagepage/destaques1.jpg',new Date())
  addingredientrecipe= new Temp(0,environment.iduser,0,0,0)
  inlist:boolean = false
  
  constructor(
    private ativateRoute:ActivatedRoute,
    private serviceRecipe:ServiceRecipesService,
    private servicecategory: ServiceCategoryService,
    private serviceDifficulty: ServiceDifficultyService,
    private serviceIngredient: ServiceIngredientsService,
    private serviceUnity: ServiceUnitysService,
    private router:Router,
    private http:HttpClient
  ) { 

    this.getCategory(),
    this.getDifficulty(),
    this.getIngredient(),
    this.getUnity()

   
  }

  ngOnInit(): void {
    this.ativateRoute.params.subscribe(params =>{
     this.idrecipe = params['id'];
      this.getRecipeEdit(this.idrecipe);
  })
  }

  getRecipeEdit(idrecipe:number){
    this.serviceRecipe.getRecipe(idrecipe)
    .subscribe(
      (response) =>{
       this.addrecipe = response;
       this.getRealTemp();
      },
      (error) =>{
      
      }
    )
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

  getRealTemp(){

   

    this.serviceIngredient.getRealTemp(this.idrecipe)
    .subscribe(
      (response) => {
       this.getTemp(environment.iduser);
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
  nomeficheiroantigo:string = ""
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {
      this.nomeficheiroantigo = this.addrecipe.imagerecipe;
       this.addrecipe.imagerecipe = file.name;
       this.formData.append("files", file);
    }
  }

  uploadimage(){

    if (this.nomeficheiroantigo  != "" || this.nomeficheiroantigo != this.addrecipe.imagerecipe){
    const upload$ = this.http.post("http://localhost:5101/api/recipes/upload", this.formData);
    upload$.subscribe();
    }
  }
  
//Adicionar receita
  onSubmit(){


    if (this.listemp.length == 0){
      this.addmenssage = "Tem de associar ingredientes à receita!" 
      return
    }
 

    this.serviceRecipe.editRecipe(this.addrecipe)
    .subscribe(
      (response) => {
        this.removeAllReal();
        this.uploadimage();
        this.addmenssage = "Receita editada com sucesso!";
      },
      (error) =>{
        this.menssage = error;
      }
    )


  }

  onClean(){
    this.addingredientrecipe= new Temp(0,environment.iduser,0,0,0)
    this.addrecipe = new Recipemaster (0,'','',0,0,environment.iduser,7,0,'assets/imagepage/destaques1.jpg',new Date())
    this.listemp = []
  }

  onCancel(){
    if(localStorage.getItem("tarefa")=="admrecipe")
    { this.router.navigateByUrl('/recipes');} else {
      this.router.navigateByUrl('/vadalidationrecipes');
    }

  }

  removeAllReal(){
    this.serviceIngredient.removeAllReal(this.addrecipe.idrecipe)
    .subscribe(
      (response) =>{

      }
    )

    this.serviceIngredient.sendTempReal(this.addrecipe.idrecipe)
    .subscribe(
     (response) =>{
       this.onClean();

       setTimeout(() => {
        if(localStorage.getItem("tarefa")=="admrecipe")
        { this.router.navigateByUrl('/recipes');} else {
          this.router.navigateByUrl('/vadalidationrecipes');
        }
     }, 2000);

     }
    )
  }
 
}
