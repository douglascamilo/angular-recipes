import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/model/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeId = 1;
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

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
    this.updateRecipeId();
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

  private updateRecipeId(): void {
    this.recipeId = 0;

    this.recipes.forEach(recipe => {
      if (this.recipeId < recipe.id) {
        this.recipeId = recipe.id;
      }
    });

    this.recipeId++;
  }
}
