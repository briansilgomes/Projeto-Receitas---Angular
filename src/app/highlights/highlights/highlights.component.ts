import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/class/recipes';
import { ServiceHighlightsService } from 'src/app/services/service-highlights.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.css'],
})
export class HighlightsComponent implements OnInit {
  title: string = 'RECEITAS DE CULINÁRIA';
  menssage: string = '';

  highlights: Recipes[] = [];

  constructor(public serviceHighlights: ServiceHighlightsService) {
    this.getHighlights();
  }

  ngOnInit(): void {}

  getHighlights() {
    this.serviceHighlights.getRecipes().subscribe(
      (response) => {
        this.highlights = response;
      },
      (error) => {
        this.menssage = error;
      }
    );
  }
}
