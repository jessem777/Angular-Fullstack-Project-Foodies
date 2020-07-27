import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomemadeRecipes } from '../../../food2fork/api.model';
import { SearchApiService } from '../../service/search-api.service';

@Component({
  selector: 'app-homemade',
  templateUrl: './homemade.component.html',
  styleUrls: ['./homemade.component.css']
})
export class HomemadeComponent implements OnInit {
  private homemadeRecipes: HomemadeRecipes[] = [];
  

  constructor(private searchApi: SearchApiService) { }

  ngOnInit() {
       this.click();
  }
  click(){
    this.searchApi.getHomemade('homemade');
      this.searchApi.getHomemadeUpdateListener()
      .subscribe((homemadeRecipes: HomemadeRecipes[]) => {
      this.homemadeRecipes = homemadeRecipes;
      console.log(this.homemadeRecipes)
    });
  }

}
