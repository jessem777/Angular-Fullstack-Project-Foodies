import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipes, 
  EventRecipes, 
  HomemadeRecipes, 
  RankRecipes, 
  TimeRecipes, 
  IdRecipes } from '../api.model';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
private recipes: Recipes[] = [];
private eventRecipes: EventRecipes[] = [];
private homemadeRecipes: HomemadeRecipes[] = [];
private rankRecipes: RankRecipes[] = [];
private timeRecipes: TimeRecipes[] = [];



private recipeUpdated = new Subject<Recipes[]>();
private eventUpdated = new Subject<EventRecipes[]>();
private homemadeUpdated = new Subject<HomemadeRecipes[]>();
private rankUpdated = new Subject<RankRecipes[]>();
private timeUpdated = new Subject<TimeRecipes[]>();

private idRecipes: IdRecipes[] = [];
private idRecipesUpdated =new Subject<IdRecipes[]>();

private recipeSub: Subscription;
private unsubsciptions$ = new Subject();
errorFromSubscribe;



query: string;
id: any;
//api key
key = '84837f2fcbmshbabddd656d6be12p1440d7jsna0892df3cbab'
constructor(public http: HttpClient) {}

  getApi(query) {
    this.query = query;
    return this.http.get<{recipes: any}>(`https://www.food2fork.com/api/search?key=${this.key}&q=${this.query}`)
    .pipe(map((data) => {
      return data.recipes.map(recipes => {
        return {
          url: recipes.f2f_url,
          image: recipes.image_url,
          publisher: recipes.publisher,
          pubPage: recipes.publisher_url,
          id: recipes.recipe_id,
          rank: recipes.social_rank,
          page: recipes.source_url,
          title: recipes.title,
        }
      })
    }))
    .subscribe((mapData) => {
      this.recipes = mapData;
      const newRec = this.recipeUpdated.next([...this.recipes]);
      console.log(this.recipes);
    }) 
  };

  getEvent(query) {
    this.query = query;
    return this.http.get<{recipes: any}>(`https://www.food2fork.com/api/search?key=${this.key}&q=${this.query}`)
    .pipe(map((data) => {
      return data.recipes.map(recipes => {
        return {
          url: recipes.f2f_url,
          image: recipes.image_url,
          publisher: recipes.publisher,
          pubPage: recipes.publisher_url,
          id: recipes.recipe_id,
          rank: recipes.social_rank,
          page: recipes.source_url,
          title: recipes.title,
        }
      })
    }))
    .subscribe((mapData) => {
      this.eventRecipes = mapData;
      const newRec = this.eventUpdated.next([...this.eventRecipes]);
      console.log(this.eventRecipes);
    }) 
  };

  getHomemade(query) {
    this.query = query;
    return this.http.get<{recipes: any}>(`https://www.food2fork.com/api/search?key=${this.key}&q=${this.query}`)
    .pipe(map((data) => {
      return data.recipes.map(recipes => {
        return {
          url: recipes.f2f_url,
          image: recipes.image_url,
          publisher: recipes.publisher,
          pubPage: recipes.publisher_url,
          id: recipes.recipe_id,
          rank: recipes.social_rank,
          page: recipes.source_url,
          title: recipes.title,
        }
      })
    }))
    .subscribe((mapData) => {
      this.homemadeRecipes = mapData;
      const newRec = this.homemadeUpdated.next([...this.homemadeRecipes]);
      console.log(this.homemadeRecipes);
    }) 
  };

  getRank(query) {
    this.query = query;
    return this.http.get<{recipes: any}>(`https://www.food2fork.com/api/search?key=${this.key}&q=${this.query}`)
    .pipe(map((data) => {
      return data.recipes.map(recipes => {
        return {
          url: recipes.f2f_url,
          image: recipes.image_url,
          publisher: recipes.publisher,
          pubPage: recipes.publisher_url,
          id: recipes.recipe_id,
          rank: recipes.social_rank,
          page: recipes.source_url,
          title: recipes.title,
        }
      })
    }))
    .subscribe((mapData) => {
      this.rankRecipes = mapData;
      const newRec = this.rankUpdated.next([...this.rankRecipes]);
      console.log(this.rankRecipes);
    }) 
  };

  getTime(query) {
    this.query = query;
    return this.http.get<{recipes: any}>(`https://www.food2fork.com/api/search?key=${this.key}&q=${this.query}`)
    .pipe(map((data) => {
      return data.recipes.map(recipes => {
        return {
          url: recipes.f2f_url,
          image: recipes.image_url,
          publisher: recipes.publisher,
          pubPage: recipes.publisher_url,
          id: recipes.recipe_id,
          rank: recipes.social_rank,
          page: recipes.source_url,
          title: recipes.title,
        }
      })
    }))
    .subscribe((mapData) => {
      this.timeRecipes = mapData;
      const newRec = this.timeUpdated.next([...this.timeRecipes]);
      console.log(this.timeRecipes);
    }) 
  };



  getRecipeUpdateListener() {
    return this.recipeUpdated.asObservable();
    
  } 
  getEventUpdateListener() {
    return this.eventUpdated.asObservable();
    
  } 
  getHomemadeUpdateListener() {
    return this.homemadeUpdated.asObservable();
    
  } 
  getRankUpdateListener() {
    return this.rankUpdated.asObservable();
    
  } 
  getTimeUpdateListener() {
    return this.timeUpdated.asObservable();
    
  } 
  getIdUpdateListener() {
    return this.idRecipesUpdated.asObservable();
    
  } 
 
  getRecipeId(id) {
    this.id = id;
    return this.http.get(`https://www.food2fork.com/api/get?key=${this.key}&rId=${this.id}`)
    
  };

     
}
