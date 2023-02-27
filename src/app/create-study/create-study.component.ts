import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Study } from '../Interfaces/study.interface';
import { NgForm } from '@angular/forms';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-create-study',
  templateUrl: './create-study.component.html',
  styleUrls: ['./create-study.component.css']
})
export class CreateStudyComponent implements OnInit {
  studies:Study[] = [];
  currentUser:User|null = null;
  constructor(private api:ApiService){}
  postStudy(newStudy:NgForm) {
    let study:Study = {
      id: -1,
      question: newStudy.form.value.question,
      answer: newStudy.form.value.answer
    }
    this.api.createStudy(study).subscribe(
      (x) => this.studies.push(x as Study)
    )
    this.getStudies();
  }
  getStudies() {
    this.api.getStudy()
    .subscribe(
      (x)=>
      this.studies = x
    )
  }
  ngOnInit(): void {
    this.getStudies();
  }
  
}
