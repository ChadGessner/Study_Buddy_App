import { Component, ElementRef, Input, OnInit, Renderer2, HostListener, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Study } from '../Interfaces/study.interface';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  @Input() study: Study | null = null;
  isCanHasAnswer: boolean = false;
  isCanHasPicaard: boolean = true;
  @Input() loggedInUser: LoggedInUser | null = null;
  @Input() index: number = 0;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private api: ApiService, private render: Renderer2, el: ElementRef) { }

  notIsCanAnswer(e: MouseEvent) {
    let target = e.target as HTMLElement
    if (target && target.classList.value === 'bi bi-star-fill') {
      let parent = target.parentElement?.parentElement as HTMLHeadingElement;
      let question = parent.innerText.trim().toLowerCase();

      if (this.loggedInUser && this.study) {
        let id = this.study.id
        this.api.selectFavorite(id);
      }
      return;
    }
    if (this.study && !this.isCanHasAnswer && this.study.answer === 'THERE ARE FOUR LIGHTS!') {
            //console.log(this.isCanHasPicaard);
      this.fourLights(this.study.answer)
    }
    this.isCanHasAnswer = !this.isCanHasAnswer;
  }

  fravritClicked() {
    if (this.loggedInUser) {
      return this.clicked.emit(true);
    }
    return;
  }

  fourLights(answer: string | null | undefined) {
    let url = "https://i.imgur.com/mKtwyFr.jpg";
    let node = document.getElementsByTagName('h1')[0]
    if (node) {
      node.innerText = ''
      let img = this.render.createElement('img');
      this.render.appendChild(
        node,
        img
      )
      this.render.setStyle(img, 'width', '200px')
      this.render.setStyle(img, 'height', '200px')
      this.render.setAttribute(img, 'src', url);
      this.isCanHasPicaard = false;
    }
    return;
  }

  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.onComponentLoad();
  }
}
