import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { Ingredient } from './model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private readonly URL = 'https://course-recipe-book-20db2.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {
  }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.URL, recipes)
      .subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.URL)
      .pipe(this.transformRecipesResponse())
      .pipe(this.sendDataToRecipeService());
  }

  private sendDataToRecipeService(): MonoTypeOperatorFunction<Recipe[]> {
    return tap((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
    });
  }

  private transformRecipesResponse(): OperatorFunction<Recipe[], Recipe[]> {
    return map((recipes: Recipe[]) =>
      recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients || [] };
      }));
  }
}
