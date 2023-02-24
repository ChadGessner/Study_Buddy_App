import {
   Directive,
    ElementRef,
     HostListener,
      OnInit,
       Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFravrit]'
})
export class FravritDirective implements OnInit {

  constructor(
    private render:Renderer2,
     private el:ElementRef
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

  

