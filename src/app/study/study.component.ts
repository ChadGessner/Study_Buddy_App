
import { 
  Component,
   ElementRef,
    Input,
     OnInit,
      Renderer2,
       HostListener,
        EventEmitter,
         Output } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Study } from '../Interfaces/study.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  animations: [

    trigger('answerState', [
      state('show', style({
        'opacity': '1',
        'transform': 'translateX(0)'
      })),
      state('hidden', style({
        'opacity': '0',
        'transform': 'translateX(1200px)'
      })),
      transition('show => hidden', animate(1000)),
      transition('hidden => show', animate(1000)),


    ])
  ]
})
export class StudyComponent implements OnInit {
  answerState = 'hidden';

  @Input() study: Study | null = null;
  isCanHasAnswer: boolean = false;
  isCanHasPicaard: boolean = true;
  @Input() loggedInUser: LoggedInUser | null = null;
  @Input() index: number = 0;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private api: ApiService, private render: Renderer2, el: ElementRef) { }

  notIsCanAnswer(e: MouseEvent) {

  }
  answerTransition(e: MouseEvent) {

    this.isCanHasAnswer = !this.isCanHasAnswer;
    this.answerState = this.isCanHasAnswer ? 'show' : 'hidden';

  }

  fravritClicked(e: MouseEvent) {
    this.study = this.study as Study
    this.api.selectFavorite(this.study.id);
    this.api.onComponentLoad();

    return this.clicked.emit(true);
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
