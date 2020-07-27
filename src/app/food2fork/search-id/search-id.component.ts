import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchApiService } from '../service/search-api.service';
import { IdRecipes } from '../api.model';
import { AuthService } from "../../auth/user-auth/auth.service";




@Component({
  selector: 'app-search-id',
  templateUrl: './search-id.component.html',
  styleUrls: ['./search-id.component.css']
})
export class SearchIdComponent implements OnInit {
  private idRecipes: IdRecipes[] = [];
  ingredients: any[];
  recipeUrl:string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private searchSub: Subscription;
  

  constructor(private route: ActivatedRoute, 
    private searchApi: SearchApiService, 
    private authService: AuthService ) {}
  
    // javascript: URLs are dangerous if attacker controlled.
    // Angular sanitizes them in data binding, but you can
    // explicitly tell Angular to trust this value:
    



  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.searchSub = this.searchApi.getRecipeId(id)
    .subscribe((data: {recipe: any}) => {
      this.idRecipes = data.recipe;
      this.ingredients = data.recipe.ingredients;
      this.recipeUrl = data.recipe.source_url;
      console.log(this.idRecipes);
      console.log(this.recipeUrl);
    })  
    this.userIsAuthenticated = this.authService.getAuthStatus()
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(Authenticated => {
      this.userIsAuthenticated = Authenticated;
    });
    
  }

  ngOnDestroy(){
    this.searchSub.unsubscribe();
  }

}
