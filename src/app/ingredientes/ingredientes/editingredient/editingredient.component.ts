import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/class/ingredient';
import { ServiceIngredientsService } from 'src/app/services/service-ingredients.service';

@Component({
  selector: 'app-editingredient',
  templateUrl: './editingredient.component.html',
  styleUrls: ['./editingredient.component.css'],
})
export class EditingredientComponent implements OnInit {
  title: string = 'Editar Ingrediente';
  ingredient = new Ingredient(0, '');
  menssage: string = '';
  menssageerror: string = '';

  constructor(
    private serviceIngredients: ServiceIngredientsService,
    private router: Router,
    private ativateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ativateRoute.params.subscribe((params) => {
      const id = params['id'];
      this.getIngredientId(id);
    });
  }

  getIngredientId(id: number) {
    this.serviceIngredients.getIngredientId(id).subscribe(
      (response) => {
        this.ingredient.idingredient = response.idingredient;
        this.ingredient.nameingredient = response.nameingredient;
      },

      (error) => {
        this.menssage = error;
      }
    );
  }

  onSubmit() {
    this.serviceIngredients
      .validateIngredient(this.ingredient)
      .subscribe((response) => {
        if (response != null) {
          this.menssageerror = 'O Ingrediente já existe !';
        } else {
          this.serviceIngredients.editIngredient(this.ingredient).subscribe(
            (response) => {
              this.menssage = 'Ingrediente editado com sucesso!';

              setTimeout(() => {
                this.router.navigateByUrl('/ingredients');
              }, 2000);
            },

            (error) => {
              this.menssageerror = error;
            }
          );
        }
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
