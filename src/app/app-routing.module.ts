import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NoSelectedRecipeComponent } from './recipes/no-selected-recipe/no-selected-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children:
      [
        { path: '', component: NoSelectedRecipeComponent },
        { path: ':id', component: RecipeDetailComponent }
      ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
