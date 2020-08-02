import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/model/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChangedEvent = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 5)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(id: number): Ingredient {
    return this.getIngredients()[id];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitIngredientsChangedEvent();
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.emitIngredientsChangedEvent();
  }

  updateIngredient(ingredientId: number, ingredient: Ingredient): void {
    this.ingredients[ingredientId] = ingredient;
    this.emitIngredientsChangedEvent();
  }

  private emitIngredientsChangedEvent(): void {
    this.ingredientsChangedEvent.next(this.getIngredients());
  }
}
