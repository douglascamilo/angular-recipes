import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class IsRecipeIdValidService implements CanActivate {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const recipeId = route.params.id;
    const recipe = this.recipeService.getRecipe(recipeId);

    if (!recipe) {
      this.router.navigate([ '..' ], { relativeTo: this.activatedRoute });
    }

    return recipe != null;
  }
}
