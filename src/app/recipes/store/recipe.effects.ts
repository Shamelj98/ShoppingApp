import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipes.action';
import * as fromAPP from '../../store/app.reducer';
import { dispatch } from "rxjs/internal/observable/pairs";

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.aciton$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
        return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-44287-default-rtdb.firebaseio.com/recipes.json'
        );
    }),
    map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
    }), 
    map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
      );

  @Effect({dispatch: false})
  storeRecipes = this.aciton$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
     return this.http
      .put(
        'https://ng-course-recipe-book-44287-default-rtdb.firebaseio.com/recipes.json',
        recipesState.recipes
      )
    })
  );
  constructor(private aciton$: Actions, private http: HttpClient, private store: Store<fromAPP.AppState>) {}
}