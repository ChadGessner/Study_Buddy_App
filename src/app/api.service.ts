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
  loginURI:string = ''
  selectFavoriteURI:string = 'https://localhost:7087/api/User/AddFavorite/';
  removeFavoriteURI:string = 'https://localhost:7087/api/User/DeleteFavorite/';
  studyURI:string = 'https://localhost:7087/api/Study/';
  currentUser:User|null = null;

  selectFavorite(userId:number,studyId:number){
    return this.http.post<Study>(this.selectFavoriteURI + `${userId}/${studyId}`,{})
  }
  removeFavorite(userId:number,studyId:number){
    return this.http.post<boolean>(this.removeFavoriteURI + `${userId}/${studyId}`,{})
  }
  getUser(userName:string, password:string) { // api call to get the user that logged in, only used by login component
    console.log(userName)
    console.log(password);
    console.log(this.userURI + `${userName}/${password}`);
    return this.http.get<User>(this.userURI + `Login/${userName}/${password}`);
  }
  registerUser(user:User) { // api call to add the newly registered user, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http.post<User>(this.userURI + `CreateLogin/${userName}/${password}`,user)
  }
  setUser(currentUser:User){ // sets the currently logged in user in this service so that its globally available to all components, also only used by login component
    this.currentUser = currentUser;
  }
  giveCurrentUser(){ // provides the currently logged in user or null to components so they can provide the appropriate functionality, used by any component that needs this data
    return this.currentUser;
  }
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
