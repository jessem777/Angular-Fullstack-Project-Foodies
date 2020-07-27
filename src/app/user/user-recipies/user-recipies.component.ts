import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from './recipe-service/recipe-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Recipe } from './recipe-service/recipe.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-user-recipies',
  templateUrl: './user-recipies.component.html',
  styleUrls: ['./user-recipies.component.scss']
})
export class UserRecipiesComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private id: string;

constructor(public recipeService: RecipeService, public activedRoute: ActivatedRoute) {}

  ngOnInit() {
      this.edit()
  }
  edit(){
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      ingredients: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });
    this.activedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.recipeService.editRecipe(this.id).subscribe(recipeData => {
          this.recipe = {
            id: recipeData._id, 
            title: recipeData.title, 
            ingredients: recipeData.ingredients,
            imagePath: recipeData.imagePath,
            creator: recipeData.creator
          };
          this.form.setValue({ 
            title: this.recipe.title, 
            ingredients: this.recipe.ingredients, 
            image: this.recipe.imagePath 
          });
          console.log('edit mode')
        });
      }else {
        this.mode = 'create';
        this.id = null;
      }
    }); 
  }
  
  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  onSaveRecipe(){
     if(this.form.invalid){
      return;
    }; 
    if(this.mode === 'create') {
      this.recipeService.addRecipes(this.form.value.title, this.form.value.ingredients, this.form.value.image);
      console.log('create mode')
    }else {
      this.recipeService.updateRecipe(this.id, this.form.value.title, this.form.value.ingredients, this.form.value.image)
      console.log('updated')
    }  
    this.form.reset();
   };
 
   

}
