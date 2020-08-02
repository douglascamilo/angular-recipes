import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private editMode = false;
  private editedIngredientId: number;

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
      .subscribe((ingredientId: number) => {
        this.editedIngredientId = ingredientId;
        this.editMode = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewIngredient(form: NgForm): void {
    const name = form.value.name;
    const amount = form.value.amount;

    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }
}
