import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  //currentUser: User | null = null;
  userName: string = '';
  password: string = '';
  loginError: boolean = false;
  errorMessage:string = ''
  users: User[] = [];
  @Input() loggedInUser: LoggedInUser | null = null;
  constructor(private api: ApiService) {
    //this.checkUser();
  }

  isUsers() {
    if (this.users.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  isRegistered(userName: string):User|undefined {
    if (!this.isUsers()) {
      return undefined;
    }
    return this.users
      .filter(x => x.userName === userName)[0];
  }
  isPassword(user:User, password:string) {
    
    return user.password === password;
  }
  getUser(userName: string, password: string) {
    let user = this.isRegistered(userName);
    if (!user) {
      this.loginError = true;
      this.postErrorMessage("That username does not exist!");
      return;
      
    }else if( !this.isPassword(user, password)){
      this.loginError = true;
      this.postErrorMessage("Incorrect Password!");
      return;
    }
    console.log("User logged in I guess");
    
    this.api.setUser(user);
    return;
  }

  addUser(userName: string, password: string) {
    if (!this.isUsers()) {
      return;
    }
    
    this.api.getRegisteredUser({
      id: -1,
      userName: userName,
      password: password
    })
  }

  onLogout() {
    this.api.onLogout();
    this.loginError = false;
  }

  onLogin(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    if(this.isRegistered(name)) {
      setTimeout(() => {
        this.getUser(name, pass)
    // this.isPosted = true;
    },1000)
  }
  }
  postErrorMessage(message:string){
    this.errorMessage = message;
  }
  newUser(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    let user = this.isRegistered(name);
    if(user){
      this.loginError = true;
      this.postErrorMessage("That username already exists!");
      return;
    }
    this.addUser(name, pass)
    setTimeout(() => {
      
      this.api.setUser({
        id: -1,
        userName: name,
        password: pass
      }) // passing the currently logged in user back to service so it is globally available, has to be done this way...
      
    }, 1000)
  }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((x) => this.users = x);
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.onComponentLoad();
  }
}


