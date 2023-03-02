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
  static onLogout() {
    throw new Error('Method not implemented.');
  }
  currentUser: User | null = null;
  userName: string = '';
  password: string = '';
  loginError: boolean = false;
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

  isRegistered(userName: string, password: string) {
    if (!this.isUsers()) {
      return undefined;
    }
    return this.users
      .filter(x => x.userName === userName && x.password === password)[0];
  }

  getUser(userName: string, password: string) {
    let user = this.isRegistered(userName, password);
    if (user) {
      this.api.setUser(user);
    }
    return;
  }

  addUser(userName: string, password: string) {
    if (!this.isUsers()) {
      return;
    }
    if (!this.isRegistered(userName, password))
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
    this.getUser(name, pass)
    // this.isPosted = true;
    setTimeout(() => {
      if (this.currentUser) {
        console.log(this.currentUser)
      }
      else {
        this.loginError = true;
      }
      if (this.currentUser) {
        this.api.setUser(this.currentUser) // passing the currently logged in user back to service so it is globally available, has to be done this way...
      }
    }, 1000)
  }

  newUser(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    this.addUser(name, pass)
    setTimeout(() => {
      if (this.currentUser) {
        console.log(this.currentUser)
      }
      if (this.currentUser) {
        this.api.setUser(this.currentUser) // passing the currently logged in user back to service so it is globally available, has to be done this way...
      }
    }, 1000)
  }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((x) => this.users = x);
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.onComponentLoad();
  }
}


