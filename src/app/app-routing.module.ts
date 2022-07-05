import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdduserComponent } from './users/admuser/adduser.component';
import { AdmhighlightsComponent } from './highlights/highlights/admhighlights/admhighlights.component';
import { HighlightsComponent } from './highlights/highlights/highlights.component';
import { AddingredientComponent } from './ingredientes/ingredientes/addingredient/addingredient.component';
import { EditingredientComponent } from './ingredientes/ingredientes/editingredient/editingredient.component';
import { IngredientesComponent } from './ingredientes/ingredientes/ingredientes.component';
import { AuthguardService } from './login/authguard.service';
import { LoginComponent } from './login/login.component';
import { AdmrecipevalidationComponent } from './recipes/recipes/admrecipevalidation/admrecipevalidation.component';
import { RecipedetailsComponent } from './recipes/recipes/recipedetails/recipedetails.component';
import { RecipeeditComponent } from './recipes/recipes/recipeedit/recipeedit.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { RecipesaddComponent } from './recipes/recipes/recipesadd/recipesadd.component';
import { AddunityComponent } from './unitys/unitys/addunity/addunity.component';
import { EditunityComponent } from './unitys/unitys/editunity/editunity.component';
import { UnitysComponent } from './unitys/unitys/unitys.component';
import { UserfavoriteComponent } from './users/userfavorite/userfavorite.component';
import { UserhomeComponent } from './users/userhome/userhome.component';
import { UsermenuComponent } from './menu/usermenu.component';
import { UserrecipeComponent } from './users/userrecipe/userrecipe.component';
import { UseraddComponent } from './users/useradd/useradd.component';
import { UsereditComponent } from './users/useredit/useredit.component';


const routes: Routes = [
 {path:'', component: HighlightsComponent},
 {path:'recipes', component: RecipesComponent},
 {path:'recipedetails', component: RecipedetailsComponent},
 {path:'recipedetails/:id', component: RecipedetailsComponent},
 {path:'userrecipe', component: UserrecipeComponent , canActivate:[AuthguardService]},
 {path:'userfavorite', component: UserfavoriteComponent , canActivate:[AuthguardService]},
 {path:'usermenu', component: UsermenuComponent , canActivate:[AuthguardService]},
 {path:'userhome', component: UserhomeComponent , canActivate:[AuthguardService]},
 {path:'vadalidationrecipes', component: AdmrecipevalidationComponent , canActivate:[AuthguardService]},
 {path:'ingredients', component: IngredientesComponent , canActivate:[AuthguardService]},
 {path:'addingredient', component: AddingredientComponent , canActivate:[AuthguardService]},
 {path:'editingredient', component: EditingredientComponent , canActivate:[AuthguardService]},
 {path:'editingredient/:id', component: EditingredientComponent , canActivate:[AuthguardService]},
 {path:'unitys', component: UnitysComponent , canActivate:[AuthguardService]},
 {path:'addunity', component:AddunityComponent , canActivate:[AuthguardService]},
 {path:'editunity/:id', component:EditunityComponent , canActivate:[AuthguardService]},
 {path:'admusers', component:AdduserComponent, canActivate:[AuthguardService]},
 {path:'editrecipe/:id', component:RecipeeditComponent , canActivate:[AuthguardService]},
 {path:'useradd',component:UseraddComponent},
 {path:'useredit/:id',component:UsereditComponent, canActivate:[AuthguardService]},
 {path:'usermenu',component:UsermenuComponent, canActivate:[AuthguardService]},


 {path:'newrecipe', component: RecipesaddComponent , canActivate:[AuthguardService]},
 {path:'admhighlights', component:AdmhighlightsComponent , canActivate:[AuthguardService]},
 {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
