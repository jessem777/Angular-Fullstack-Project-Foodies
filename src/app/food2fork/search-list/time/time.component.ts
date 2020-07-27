import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TimeRecipes } from '../../../food2fork/api.model';
import { SearchApiService } from '../../service/search-api.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  private timeRecipes: TimeRecipes[] = [];
  private timeUpdated = new Subject<TimeRecipes[]>();

  constructor(private searchApi: SearchApiService) { }

  ngOnInit() {
      this.onclick()
  }
  onclick(){
    this.searchApi.getTime('quick');
      this.searchApi.getTimeUpdateListener()
      .subscribe((timeRecipes: TimeRecipes[]) => {
      this.timeRecipes = timeRecipes;
      console.log(this.timeRecipes)
    });
  }
}
