import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/model/ingredient';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeId = Number(params.id);
        this.editMode = Boolean(this.recipeId);

        this.initForm();
      });
  }

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }

  onAddIngredient(): void {
    this.getIngredientsControl().push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    }));
  }

  private initForm(): void {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.recipeId);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients
          .forEach((ingredient: Ingredient) => {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount)
            }));
          });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    });
  }

  getIngredientsControl(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
