import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RankRecipes } from '../../../food2fork/api.model';
import { SearchApiService } from '../../service/search-api.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  private rankRecipes: RankRecipes[] = [];
  

  constructor(public searchApi: SearchApiService) { }

  ngOnInit() {
     this.onclick(); 
  }

  onclick(){
    this.searchApi.getRank('best');
    this.searchApi.getRankUpdateListener()
    .subscribe((rankRecipes: RankRecipes[]) => {
    this.rankRecipes = rankRecipes;
    console.log(this.rankRecipes)
  }); 
  }
}
