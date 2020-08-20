import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/model/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  recipeId = 1;

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ],
      this.recipeId++),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ],
      this.recipeId++)
  ];

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe): void {
    if (!recipe.id) {
      recipe.id = this.recipeId++;
    }

    this.recipes.push(recipe);
    this.emitRecipesChangedEvent();
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.emitRecipesChangedEvent();
  }

  updateRecipe(updatedRecipe: Recipe): void {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);

    if (recipeIndex >= 0) {
      this.recipes[recipeIndex] = updatedRecipe;
      this.emitRecipesChangedEvent();
    }
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number): Recipe {
    return this.getRecipes()
      .find((recipe: Recipe) => recipe.id === id);
  }

  deleteRecipe(recipe: Recipe): Observable<void> {
    return new Observable<void>(subscriber => {
      const recipeIndex = this.recipes.indexOf(recipe);
      const recipeDeleted = this.recipes.splice(recipeIndex, 1);

      if (recipeDeleted?.length !== 0) {
        subscriber.next();
        subscriber.complete();
        this.emitRecipesChangedEvent();
        return;
      }

      subscriber.error(new Error(`It wasn't possible to delete recipe with id: ${ recipe.id }`));
    });
  }

  private emitRecipesChangedEvent(): void {
    this.recipesChanged.next(this.getRecipes());
  }
}
