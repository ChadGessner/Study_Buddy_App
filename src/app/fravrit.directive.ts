import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';
import { ApiService } from './api.service';
import { LoggedInUser } from './Interfaces/loggedInUser.interface';
import { User } from './Interfaces/user.interface';

@Directive({
  selector: '[appFravrit]'
})
export class FravritDirective implements OnInit {
  loggedInUser: LoggedInUser | null = null;
  constructor(
    private render: Renderer2,
    private el: ElementRef,
    private api: ApiService
  ) { }
  validateLoginStatus() {
    //this.currentUser = this.api.giveCurrentUser();
    return this.loggedInUser !== null;
  }

  @HostListener('document:click', ['$event']) getPink(e: MouseEvent) {

    let target = this.el.nativeElement;
    let isTarget = target === e.target as HTMLElement;
    if (!isTarget) {
      return;
    }
    if (!this.validateLoginStatus()) {
      alert("You must login first before you can add favorites!");
      return;
    }
    if (target.style.color !== 'pink') {
      this.render.setStyle(
        target,
        'color',
        'pink'
      )
      //this.api.selectFavorite()
    } else {
      this.render.setStyle(
        target,
        'color',
        'grey'
      )
    }
  }
  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.onComponentLoad();
  }
}



