import { isNgContainer } from '@angular/compiler';
import { Component, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  showAll:EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  isCanShowAllAnswers:boolean = false;
  constructor(private api:ApiService) {
    
  }
  getPathName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[
      pathArray.length - 1
    ]
  }
  showAnswers(e:MouseEvent) {
    this.isCanShowAllAnswers = !this.isCanShowAllAnswers;
    this.api.eventsFromNavToStudy(e)
  }
  showAnswersMessage() {
    return this.isCanShowAllAnswers ? 'Show Answers!' : 'Hide Answers!';
  }


}
