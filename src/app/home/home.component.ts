import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Study } from '../Interfaces/study.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  studies: Study[] = []
  filtered: boolean = false;
  @Input() loggedInUser: LoggedInUser | null = null;
  constructor(private api: ApiService) { }
  isLoggedInUser() {
    if (this.loggedInUser) {
      return this.loggedInUser.User.userName;
    } else {
      return 'user'
    }
  }

  fravritClicked(event: boolean) {
    this.api.onComponentLoad()
  }
  onFiltered() {
    this.filtered = !this.filtered;
  }
  getRange() {
    console.log([...Array(Math.floor(Math.abs(this.studies.length / 3))).keys()]);

    return [...Array(Math.ceil(Math.abs(this.studies.length / 3))).keys()]
  }
  mathsAbs(i: number, j: number) {
    return Math.floor(Math.abs((i + 1) - (j + 1)));
  }

  ngOnInit(): void {
    this.api.getStudy().subscribe(
      (x) => this.studies = x
    )
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x as LoggedInUser);
    this.api.onComponentLoad();
  }
}
