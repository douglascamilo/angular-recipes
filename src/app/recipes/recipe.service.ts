import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe 01', 'A test recipe - 01',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Recipe 02', 'A test recipe - 02',
      'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg')
  ];

  getRecipes(): Recipe[] {
    return Array.from(this.recipes);
  }
}
