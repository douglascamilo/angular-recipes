import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/model/ingredient';
import { Recipe } from '../recipe.model';

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
    private recipeService: RecipeService,
    private router: Router
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
    const newRecipe: Recipe = this.recipeForm.getRawValue();
    newRecipe.id = this.recipeId;

    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.navigateBack();
  }

  onAddIngredient(): void {
    const ingredientsControl = this.getIngredientsControl();
    ingredientsControl.push(this.createIngredientFormGroup());
  }

  getIngredientsControl(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel(): void {
    this.navigateBack();
  }

  onDeleteIngredient(ingredientIndex: number): void {
    this.getIngredientsControl().splice(ingredientIndex, 1);
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
            recipeIngredients.push(this.createIngredientFormGroup(ingredient));
          });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  private createIngredientFormGroup(ingredient?: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(ingredient?.name, Validators.required),
      amount: new FormControl(ingredient?.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  private navigateBack(): void {
    this.router.navigate([ '..' ], {
      relativeTo: this.route
    });
  }
}
