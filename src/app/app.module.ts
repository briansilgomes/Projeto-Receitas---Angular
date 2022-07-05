import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { HeaderComponent } from './header/header/header.component';
import { AdmhighlightsComponent } from './highlights/highlights/admhighlights/admhighlights.component';
import { HighlightsComponent } from './highlights/highlights/highlights.component';
import { AddingredientComponent } from './ingredientes/ingredientes/addingredient/addingredient.component';
import { EditingredientComponent } from './ingredientes/ingredientes/editingredient/editingredient.component';
import { IngredientesComponent } from './ingredientes/ingredientes/ingredientes.component';
import { AuthService } from './login/auth.service';
import { LoginComponent } from './login/login.component';
import { UsermenuComponent } from './menu/usermenu.component';
import { AdmrecipevalidationComponent } from './recipes/recipes/admrecipevalidation/admrecipevalidation.component';
import { RecipedetailsComponent } from './recipes/recipes/recipedetails/recipedetails.component';
import { RecipeeditComponent } from './recipes/recipes/recipeedit/recipeedit.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { RecipesaddComponent } from './recipes/recipes/recipesadd/recipesadd.component';
import { AddunityComponent } from './unitys/unitys/addunity/addunity.component';
import { EditunityComponent } from './unitys/unitys/editunity/editunity.component';
import { UnitysComponent } from './unitys/unitys/unitys.component';
import { AdduserComponent } from './users/admuser/adduser.component';
import { UseraddComponent } from './users/useradd/useradd.component';
import { UsereditComponent } from './users/useredit/useredit.component';
import { UserfavoriteComponent } from './users/userfavorite/userfavorite.component';
import { UserhomeComponent } from './users/userhome/userhome.component';
import { UserrecipeComponent } from './users/userrecipe/userrecipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightsComponent,
    RecipesComponent,
    RecipedetailsComponent,
    CommentsComponent,
    UserrecipeComponent,
    UserfavoriteComponent,
    UsermenuComponent,
    UserhomeComponent,
    AdmrecipevalidationComponent,
    IngredientesComponent,
    UnitysComponent,
    RecipesaddComponent,
    AdmhighlightsComponent,
    AddingredientComponent,
    EditingredientComponent,
    AddunityComponent,
    EditunityComponent,
    AdduserComponent,
    RecipeeditComponent,
    LoginComponent,
    UseraddComponent,
    UsereditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
