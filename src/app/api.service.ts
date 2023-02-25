import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Study } from 'src/app/Interfaces/study.interface'
import { User } from './Interfaces/user.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  constructor(private http:HttpClient) { }
  userURI:string = 'https://localhost:7087/api/User/';
  
  studyURI:string = 'https://localhost:7087/api/Study/';
  //currentUser:Observable<User> = new Observable<User>();
  getUser(userName:string, password:string) {
    console.log(userName)
    console.log(password);
    console.log(this.userURI + `${userName}/${password}`);
    
    return this.http.get<User>(this.userURI + `${userName}/${password}`);

  }
  registerUser(user:User) {
    let userName = user.userName;
    let password = user.password;
    return this.http.post<User>(this.userURI + `${userName}/${password}`,user)
  }
  // setUser() {
  //   return this.currentUser;
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
  isFavorite() {

  }
  ngOnInit(): void {
    
  }
}
