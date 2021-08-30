import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
   



    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel',
         'A super-tasty Schnitzel - just awesome!',
        'https://thumbs.dreamstime.com/b/chicken-schnitzel-plate-tasty-chicken-schnitzel-plate-wooden-table-close-up-view-113362221.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe('Big Fat Burger', 
        'What else you need to say?',
        'https://b.zmtcdn.com/data/pictures/chains/5/18962805/009f38b4e2be1043d48a1246f681efb7.png',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
      
      ];

      constructor(private slService: ShoppingListService){}

      getRecipies() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);

      }
    

}