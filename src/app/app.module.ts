import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StudyComponent } from './study/study.component';
import { HeaderComponent } from './header/header.component';
import { FravritDirective } from './fravrit.directive';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { CreateStudyComponent } from './create-study/create-study.component';

@NgModule({
  declarations: [
    AppComponent,
    StudyComponent,
    HeaderComponent,
    FravritDirective,
    UserLoginComponent,
    HomeComponent,
    CreateStudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
