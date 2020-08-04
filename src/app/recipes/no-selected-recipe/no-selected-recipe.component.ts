import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-no-selected-recipe',
  templateUrl: './no-selected-recipe.component.html',
  styleUrls: ['./no-selected-recipe.component.css']
})
export class NoSelectedRecipeComponent implements OnInit {
  hasRecipes: boolean;

  constructor(
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.hasRecipes = this.recipeService.getRecipes()?.length > 0;
  }
}
