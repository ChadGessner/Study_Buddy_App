import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Study } from '../Interfaces/study.interface';
import { User } from '../Interfaces/user.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  studies:Study[] = []
  currentUser:User|null = null;
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getStudy().subscribe(
      (x) => this.studies = x
    )
    
  }
}
