import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateStudyComponent } from './create-study/create-study.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'create-study', component: CreateStudyComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' }];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
