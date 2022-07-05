import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/class/ingredient';
import { ServiceIngredientsService } from 'src/app/services/service-ingredients.service';

@Component({
  selector: 'app-addingredient',
  templateUrl: './addingredient.component.html',
  styleUrls: ['./addingredient.component.css'],
})
export class AddingredientComponent implements OnInit {
  constructor(
    private serviceIngredients: ServiceIngredientsService,
    private router: Router
  ) {}

  title: string = 'Adicionar Ingrediente';
  ingredient = new Ingredient(0, '');
  menssage: string = '';
  menssageerror: string = '';

  ngOnInit(): void {}

  onSubmit() {
    this.serviceIngredients
      .validateIngredient(this.ingredient)
      .subscribe((response) => {
        if (response != null) {
          return (this.menssageerror = 'O Ingrediente já existe !');
        }

        return this.serviceIngredients
          .createIngredient(this.ingredient)
          .subscribe(
            (response) => {
              this.menssage = 'Ingrediente adicionado com sucesso!';
              setTimeout(() => {
                this.router.navigateByUrl('/ingredients');
              }, 2000);
            },

            (error) => {
              this.menssageerror = error;
            }
          );
      });
  }

  onCancel() {
    this.router.navigateByUrl('/ingredients');
  }

  clean() {
    this.menssage = '';
    this.menssageerror = '';
  }
}
