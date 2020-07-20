import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe((params: Params) => this.loadSelectedRecipe(params));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  private loadSelectedRecipe(params: Params): void {
    const recipeId = params.id;
    this.recipe = this.recipeService.getRecipe(recipeId);
  }
}
