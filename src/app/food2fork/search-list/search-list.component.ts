import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipes } from '../api.model';
import { SearchApiService } from '../service/search-api.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})

export class SearchListComponent implements OnInit,OnDestroy {
  recipes: Recipes[] = [];
  query: string;
  errorFromSubscribe;
  title = "Welcome to Foodies";
  private searchSub: Subscription;
 
   constructor(private searchApi: SearchApiService) { }
 
   ngOnInit() {
     this.searchSub = this.searchApi.getRecipeUpdateListener()
    .subscribe((recipes: Recipes[]) => {
      this.recipes = recipes;
      console.log(this.recipes)
     });
        }

      ngOnDestroy(){
        this.searchSub.unsubscribe();
      }
}
