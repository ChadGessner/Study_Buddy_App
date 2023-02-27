import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Study } from 'src/app/Interfaces/study.interface'
import { User } from './Interfaces/user.interface';
import { Observable } from 'rxjs';
import { LoggedInUser } from './Interfaces/loggedInUser.interface';
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
  loggedInUser:LoggedInUser|null = null;
  @Output()loggedInEvent:EventEmitter<LoggedInUser> = new EventEmitter<LoggedInUser>();

  selectFavorite(userId:number,studyId:number){
    return this.http.post<Study>(this.selectFavoriteURI + `${userId}/${studyId}`,{})
  }
  removeFavorite(userId:number,studyId:number){
    return this.http.post<boolean>(this.removeFavoriteURI + `${userId}/${studyId}`,{})
  }
  getAllUsers(){
    return this.http.get<User[]>(this.userURI,{});
  }
  getLoggedInUserFavorites() {
    let id = -1;
    if(this.loggedInUser){
      id = this.loggedInUser.User.id;
      let user = this.loggedInUser.User;
      return this.http.get<Study[]>(this.studyURI + `GetAllUserFavorites/${id}`).subscribe((x)=> {
        this.loggedInUser = {
          User:user,
          Favorites:x
        }
      });
    }
    return;
  }
  getUser(user:User) { // api call to get the user that logged in, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http.get<User>(this.userURI + `Login/${userName}/${password}`).subscribe((x)=>{
      this.loggedInUser = {
        User:x,
        Favorites:[]
      }
    });
  }
  onComponentLoad() {
    if(!this.loggedInUser){
      setTimeout(()=>{
        return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
      },500)
    }
    return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
  }
  getRegisteredUser(user:User){
    this.registerUser(user);
    this.getLoggedInUserFavorites();
    this.onComponentLoad();
  }
  onLogout() {
    this.loggedInUser = null;
    this.onComponentLoad();
  }
  registerUser(user:User) { // api call to add the newly registered user, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http.post<User>(this.userURI + `CreateLogin/${userName}/${password}`,user).subscribe((x)=> {
      this.loggedInUser = {
        User:x,
        Favorites:[]
      }
    })
  }
  setUser(currentUser:User){ // sets the currently logged in user in this service so that its globally available to all components, also only used by login component
    this.getUser(currentUser);
    this.getLoggedInUserFavorites();
    setTimeout(()=>{
      return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
    },500)
  }
  giveCurrentUser(){ // provides the currently logged in user or null to components so they can provide the appropriate functionality, used by any component that needs this data
    return this.loggedInUser;
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
    return this.http.post(this.studyURI + `AddQuestion/${question}/${answer}`,study);
  }
  ngOnInit(): void {

  }
}
