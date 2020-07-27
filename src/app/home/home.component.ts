import { Component, OnInit } from '@angular/core';
import { SearchApiService } from '../food2fork/service/search-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 query: string;
 private recipeSub: Subscription;
 errorFromSubscribe;
 title = "Welcome to";

  constructor(public searchApi: SearchApiService) { }

  ngOnInit() {
    
  }

  onClickApi(){
    this.searchApi.getApi(this.query);
   this.searchApi.getRecipeUpdateListener();
  }
}

