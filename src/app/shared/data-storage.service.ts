import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

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

  fetchRecipes(): void {
    this.http
      .get<Recipe[]>(this.URL)
      .pipe(map(this.transformRecipesResponse()))
      .subscribe(recipes => this.recipeService.setRecipes(recipes));
  }

  private transformRecipesResponse(): (recipes) => any {
    return recipes =>
      recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients || [] };
      });
  }
}
