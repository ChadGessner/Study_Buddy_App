import {
   Directive,
    ElementRef,
     HostListener,
      OnInit,
       Renderer2 } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './Interfaces/user.interface';

@Directive({
  selector: '[appFravrit]'
})
export class FravritDirective implements OnInit {
  currentUser:User|null = null;
  constructor(
    private render:Renderer2,
     private el:ElementRef,
      private api:ApiService
     ) { }
  validateLoginStatus() {
    //this.currentUser = this.api.giveCurrentUser();
    return this.currentUser !== null;
  }
  
  @HostListener('document:click', ['$event'])getPink(e:MouseEvent) {
      
      let target = this.el.nativeElement;
      let isTarget = target === e.target as HTMLElement;
      if(!isTarget){
        return;
      }
      if(!this.validateLoginStatus()){
        alert("You must login first before you can select fravrits!");
        return;
      }
      if(target.style.color !== 'pink'){
        this.render.setStyle(
          target,
          'color',
          'pink'
        )
        //this.api.selectFavorite()
      }else{
        this.render.setStyle(
          target,
          'color',
          'grey'
        )
      }
    }
    ngOnInit(): void {
    
    }
}

  

