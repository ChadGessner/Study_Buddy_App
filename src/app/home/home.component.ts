import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Study } from '../Interfaces/study.interface';
import { User } from '../Interfaces/user.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  studies:Study[] = []
  @Input()loggedInUser:LoggedInUser|null = null;
  constructor(private api:ApiService){}
  isLoggedInUser() {
    if(this.loggedInUser){
      return this.loggedInUser.User.userName;
    }else{
      return 'user'
    }
  }
  ngOnInit(): void {
    this.api.getStudy().subscribe(
      (x) => this.studies = x
    )
    this.api.loggedInEvent.subscribe((x)=> this.loggedInUser = x as LoggedInUser);
    this.api.onComponentLoad();
  }
}
