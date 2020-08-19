import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

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
      .subscribe(response => console.log(response));
  }
}
