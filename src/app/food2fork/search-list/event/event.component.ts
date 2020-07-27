import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EventRecipes } from '../../../food2fork/api.model';
import { SearchApiService } from '../../service/search-api.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  private eventRecipes: EventRecipes[] = [];
 

  constructor(private searchApi: SearchApiService) { }

  ngOnInit() {
    this.click()
  }
  click(){
    this.searchApi.getEvent('holiday');
    this.searchApi.getEventUpdateListener()
      .subscribe((eventRecipes: EventRecipes[]) => {
      this.eventRecipes = eventRecipes;
      console.log(this.eventRecipes);
    });
  }
  


}
