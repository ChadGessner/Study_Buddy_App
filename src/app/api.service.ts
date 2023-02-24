import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Study } from 'src/app/Interfaces/study.interface'
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  constructor(private http:HttpClient) { }
  userURI:string = 'https://localhost:7087/api/User/'
  studyURI:string = 'https://localhost:7087/api/Study/'
  // getUser(userName:string, password:string) {
  //   return this.http.get(this.userURI + `${userName}/${password}`)
  // }
  getStudy() {
    return this.http.get<Study[]>(this.studyURI);
  }
  createStudy(study:Study) {
    let question = study.question.split(
      ' '
    ).join('%20');
    let answer = study.answer.split(
      ' '
    ).join('%20');
    return this.http.post(this.studyURI + `${question}/${answer}`,study);
  }
  ngOnInit(): void {
    
  }
}
