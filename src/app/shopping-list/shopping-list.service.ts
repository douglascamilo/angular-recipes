import { EventEmitter, Injectable } from '@angular/core';

import { Ingredient } from '../shared/model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChangedEvent = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 5)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.emitIngredientsChangedEvent();
  }

  private emitIngredientsChangedEvent(): void {
    this.ingredientsChangedEvent.emit(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.emitIngredientsChangedEvent();
  }
}
