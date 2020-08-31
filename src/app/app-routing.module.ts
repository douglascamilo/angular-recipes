import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NoSelectedRecipeComponent } from './recipes/no-selected-recipe/no-selected-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { IsRecipeIdValidService } from './recipes/resolver/is-recipe-id-valid.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children:
      [
        { path: '', component: NoSelectedRecipeComponent, resolve: [ RecipeResolverService ] },
        { path: 'new', component: RecipeEditComponent },
        {
          path: ':id',
          component: RecipeDetailComponent,
          // canActivate: [ IsRecipeIdValidService ],
          resolve: [ RecipeResolverService ]
        },
        {
          path: ':id/edit',
          component: RecipeEditComponent,
          resolve: [ RecipeResolverService ]
        },
      ]
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
