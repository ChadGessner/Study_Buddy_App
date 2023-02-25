import {
   Directive,
    ElementRef,
     HostListener,
      OnInit,
       Renderer2 } from '@angular/core';
import { ApiService } from './api.service';

@Directive({
  selector: '[appFravrit]'
})
export class FravritDirective implements OnInit {

  constructor(
    private render:Renderer2,
     private el:ElementRef,
      private api:ApiService
     ) { }

  @HostListener('document:click', ['$event'])getPink(e:MouseEvent) {
      let target = this.el.nativeElement;
      let isTarget = target === e.target as HTMLElement;
      if(!isTarget){
        return;
      }else if(target.style.color !== 'pink'){
        this.render.setStyle(
          target,
          'color',
          'pink'
        )
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

  

