import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  currentUser:User|null = null;
  userName:string = '';
  password:string = '';
  isPosted:boolean = false;
  constructor(private api:ApiService){
    //this.checkUser();
  }
  getUser(userName:string, password:string) {
    this.api.getUser(userName,password).subscribe(
      (x)=> this.currentUser = x
    )
  }
  addUser(userName:string, password:string) {
    this.api.registerUser({
      id: -1,
      userName: userName,
      password: password
    }).subscribe(
      (x)=> this.currentUser = x
    )
  }
  onLogin(form:NgForm){
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    this.getUser(name, pass)
    this.isPosted = true;
    setTimeout(()=> {
        if(this.currentUser){
          console.log(this.currentUser)
        }else{
          this.addUser(name,pass)
        }
        if(this.currentUser){
          this.api.setUser(this.currentUser) // passing the currently logged in user back to service so it is globally available, has to be done this way...
        }
    },2000)
    
  }
  // checkUser() {
  //   let userInterval = setInterval(()=>{
  //     console.log(this.currentUser)
  //   },5000)
  // }
  ngOnInit(): void {
    
  }
}
