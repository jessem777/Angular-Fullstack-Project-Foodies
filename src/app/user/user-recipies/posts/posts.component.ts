import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe-service/recipe.model';
import { RecipeService } from '../recipe-service/recipe-service.service';
import { DomSanitizer} from '@angular/platform-browser';
import { AuthService } from '../../../auth/user-auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy{
  recipes: Recipe[] =[];
  private recipeSub: Subscription;
  UserRecipiesComponent: any;
  public getSantizeUrl(url : string) { return this.sanitizer.bypassSecurityTrustUrl(url); }
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;

  constructor(public recipeService: RecipeService, private sanitizer: DomSanitizer, private authService: AuthService ) {}

  ngOnInit(){
    this.userId = this.authService.getUserId();
    this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.getRecipeUpdateListener()
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.userIsAuthenticated = this.authService.getAuthStatus()
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAthenticated => {
      this.userIsAuthenticated = isAthenticated
      this.userId = this.authService.getUserId();
    })
  }

  

    onDelete(id) {
      if (id === id ){
        this.recipeService.deleteRecipe(id);
      }else {
        return console.log('not working')
      }
    };

    ngOnDestroy() {
      this.recipeSub.unsubscribe();
      this.authStatusSub.unsubscribe();
   };

   
   
  }
  
  
