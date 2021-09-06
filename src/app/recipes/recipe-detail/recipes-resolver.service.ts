import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Actions, ofType} from '@ngrx/effects';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.action';
import { map, switchAll, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<fromApp.AppState>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.dataStorageService.fetchRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => {
      return recipesState.recipes;
    }),
     switchMap(recipes => {
       if (Recipe.length === 0) {
         this.store.dispatch(new RecipesActions.FetchRecipes());
         return this.action$.pipe(
          ofType(RecipesActions.SET_RECIPES),
          take(1)
         ); 
       } else {
         return of(recipes);
       }
     })
    );
    
  
  }
}
  