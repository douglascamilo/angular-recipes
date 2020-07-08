import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeItemClicked = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Recipe 01', 'a test recipe - 01',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Recipe 02', 'a test recipe - 02',
      'https://cdn.pixabay.com/photo/2015/12/20/17/11/fish-1101436_960_720.jpg')
  ];

  onRecipeItemClicked(recipeItem: Recipe): void {
    this.recipeItemClicked.emit(recipeItem);
  }
}
