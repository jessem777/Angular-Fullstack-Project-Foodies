import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { map } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


export class RecipeService implements OnInit {
  private recipes: Recipe[] = [];
  private recipeUpdated = new Subject<Recipe[]>();

  constructor(private http: HttpClient,public router: Router) {}

ngOnInit(){
  
}
  getRecipes() {
    this.http.get<{message: string, recipes: any}>('http://localhost:3000/recipes')
    .pipe(map((recipeData) => {
      return recipeData.recipes.map(recipe => {
        return {
          id: recipe._id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          imagePath: recipe.imagePath,
          creator: recipe.creator
        };
      });
    }))
    .subscribe((mapData) => {
      console.log(mapData);
      this.recipes = mapData;
      this.recipeUpdated.next([...this.recipes]);
    });
  }

  addRecipes(title: string, ingredients: string, imagePath: File){
    const recipeData = new FormData();
    recipeData.append("title", title);
    recipeData.append("ingredients", ingredients);
    recipeData.append("image", imagePath, title);
    this.http.post<{message: string, recipe: Recipe}>('http://localhost:3000/recipes', recipeData)
    .subscribe((responseData) => {
      const recipe: Recipe = { 
        id: responseData.recipe.id, 
        title: title, 
        ingredients: ingredients, 
        imagePath: responseData.recipe.imagePath,
        creator: null
      } 
      this.recipes.push(recipe);
      this.recipeUpdated.next([...this.recipes]);
      this.router.navigate(["/user"]);
      console.log(this.recipes);
    });
  }

deleteRecipe(recipeId: string) {
  const delRecipe = this.http.delete('http://localhost:3000/recipes/' + recipeId)
    .subscribe(() => {
      const updatedRecipes = this.recipes.filter( recipe => recipe.id !== recipeId);
      this.recipes = updatedRecipes;
      this.recipeUpdated.next([...this.recipes]);
    });
    console.log(delRecipe);
  }

  getRecipeUpdateListener() {
    return this.recipeUpdated.asObservable();
  }

    editRecipe(id: string){
      return this.http
      .get<{ _id:string, title: string, ingredients: string, imagePath: string, creator: string }>("http://localhost:3000/recipes/" + id);
    }

    updateRecipe(id: string, title: string, ingredients: string, image: File | string){
      let recipeData: Recipe | FormData;
      if (typeof image === "object") {
        const recipeData = new FormData();
        recipeData.append("id", id);
        recipeData.append("title", title);
        recipeData.append("ingredients", ingredients);
        recipeData.append("image", image, title);
        }else {
          recipeData = {
            id: id,
            title: title,
            ingredients: ingredients,
            imagePath: image,
            creator: null
          };
        }
      this.http.put("http://localhost:3000/recipes/" + id, recipeData)
      .subscribe(response => {
        const updatedRecipes = [...this.recipes];
        const oldRecipeIndex = updatedRecipes.findIndex(r => r.id === id);
        const recipe: Recipe = {
          id: id,
          title: title,
          ingredients: ingredients,
          imagePath: "",
          creator: null
        };
        updatedRecipes[oldRecipeIndex] = recipe;
        this.recipes = updatedRecipes;
        this.recipeUpdated.next([...this.recipes]);
      });  
     }
  
    }

