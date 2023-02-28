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

  selectFavorite(studyId:number){
    
    let userId = -1;
    let user = this.loggedInUser as LoggedInUser;
    if(user){
      userId = user.User.id;
      let favorites = user.Favorites;
      let study = favorites.filter(x=>x.id === studyId)[0];
      let magicIndex = favorites.indexOf(study);
      let length = favorites.length;
      if(user.Favorites.some(x=>x.id === studyId)){
        console.log('hit');
        favorites = favorites.slice(0, (Math.abs(magicIndex)))
        .concat(favorites.slice(-Math.abs(length - magicIndex )));
        this.removeFavorite(userId,studyId);
        this.setUser(user.User)
        setTimeout(()=>{
          console.log(this.loggedInUser?.Favorites)
          this.onComponentLoad();
        },500)
      }else{

        this.http.post<Study>(this.selectFavoriteURI + `${studyId}/${userId}`,{}).subscribe();
        this.setUser(user.User);
        setTimeout(()=>{
          console.log(this.loggedInUser?.Favorites)
          this.onComponentLoad();
        },500)
        
      }

      
      
      console.log(favorites);
    }
    //return this.http.post<Study>(this.selectFavoriteURI + `${userId}/${studyId}`,{})
  }
  removeFavorite(userId:number,studyId:number){
    return this.http.post<boolean>(this.removeFavoriteURI + `${studyId}/${userId}`,{}).subscribe((x)=> x)

  }

  getAllUsers() {
    return this.http.get<User[]>(this.userURI, {});
  }

  getLoggedInUserFavorites() {
    let id = -1;

    let usery = this.loggedInUser as LoggedInUser;
    if(usery){
      let usery = this.loggedInUser as LoggedInUser;
      console.log('hit')
      id = usery.User.id;
      let user = usery.User;

      
      return this.http.get<Study[]>(this.studyURI + `GetAllUserFavorites/${id}`).subscribe((x)=> {
        this.loggedInUser = {
          User: user,
          Favorites: x
        }
      });
    }
    return;
  }

  getUser(user: User) { // api call to get the user that logged in, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http.get<User>(this.userURI + `Login/${userName}/${password}`).subscribe((x) => {
      this.loggedInUser = {
        User: x,
        Favorites: []
      }
    });
  }

  onComponentLoad() {
    if (!this.loggedInUser) {
      setTimeout(() => {
        return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
      }, 500)
    }
    return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
  }

  getRegisteredUser(user:User){
    setTimeout(()=>{
      this.registerUser(user);
    },200)
    setTimeout(()=>{
      this.getLoggedInUserFavorites();
    },200)
    setTimeout(()=>{
      this.onComponentLoad();
    },200)

  }

  onLogout() {
    this.loggedInUser = null;
    this.onComponentLoad();
  }

  registerUser(user: User) { // api call to add the newly registered user, only used by login component
    let userName = user.userName;
    let password = user.password;
    return this.http.post<User>(this.userURI + `CreateLogin/${userName}/${password}`, user).subscribe((x) => {
      this.loggedInUser = {
        User: x,
        Favorites: []
      }
    })
  }

  setUser(currentUser:User){ // sets the currently logged in user in this service so that its globally available to all components, also only used by login component
    setTimeout(()=>{
      this.getUser(currentUser);
    },200)
    setTimeout(()=>{
      this.getLoggedInUserFavorites();
    },300)
    setTimeout(()=>{
      return this.loggedInEvent.emit(this.giveCurrentUser() as LoggedInUser);
    },300)
    
    
    // setTimeout(()=>{
      
    // },500)

  }

  giveCurrentUser() { // provides the currently logged in user or null to components so they can provide the appropriate functionality, used by any component that needs this data
    return this.loggedInUser;
  }

  getStudy() {
    return this.http.get<Study[]>(this.studyURI);
  }

  createStudy(study: Study) {
    let question = study.question.split(
      ' '
    ).join('%20');
    let answer = study.answer.split(
      ' '
    ).join('%20');
    return this.http.post(this.studyURI + `AddQuestion/${question}/${answer}`, study);
  }

  ngOnInit(): void {

  }
}
