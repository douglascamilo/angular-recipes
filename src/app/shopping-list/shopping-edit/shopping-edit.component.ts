import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIngredientId: number;
  editedIngredient: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
      .subscribe((ingredientId: number) => {
        this.editedIngredientId = ingredientId;
        this.editMode = true;

        this.editedIngredient = this.shoppingListService.getIngredient(ingredientId);
        this.form.setValue(this.editedIngredient);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmitIngredient(): void {
    const formValue = this.form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientId, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.resetForm();
  }

  resetForm(): void {
    this.editMode = false;
    this.editedIngredientId = null;
    this.editedIngredient = null;
    this.form.resetForm();
  }
}
