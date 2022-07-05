import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/class/recipes';
import { ServiceFavoriteService } from 'src/app/services/service-favorite.service';

@Component({
  selector: 'app-userfavorite',
  templateUrl: './userfavorite.component.html',
  styleUrls: ['./userfavorite.component.css'],
})
export class UserfavoriteComponent implements OnInit {
  title: string = 'OS MEUS FAVORITOS';
  menssage: string = '';

  favorite: Recipes[] = [];

  constructor(public serviceFavorite: ServiceFavoriteService) {
    this.getFavorite();
  }

  ngOnInit(): void {}

  getFavorite() {
    this.serviceFavorite.getFavorite().subscribe(
      (response) => {
        this.favorite = response;
        this.disaplayMenssage();
      },
      (error) => {
        this.menssage = error;
      }
    );
  }

  removeFavorite(fav: Recipes) {
    this.serviceFavorite.removeFavorite(fav.favorite).subscribe(
      (response) => {
        for (var i = 0; i < this.favorite.length; i++) {
          if (this.favorite[i].idrecipe == fav.idrecipe) {
            this.favorite.splice(i, 1);
          }
        }

        this.disaplayMenssage();
      },

      (error) => {
        this.menssage = error;
      }
    );
  }

  disaplayMenssage() {
    if (this.favorite.length == 0) {
      this.menssage = 'Ainda não adicionou nenhuma receita aos favoritos.';
    }
  }
}
