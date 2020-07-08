import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 5)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onNewIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
