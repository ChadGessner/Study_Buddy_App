import {
   animate,
    state,
     style,
      transition,
       trigger, 
        group,
         keyframes } from '@angular/animations';
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
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  animations: [
      trigger('answerState', [
      state('show', style({
        // 'height' : '100px',
        // 'width' : '100px',
        'opacity' : '1',
        'transform' : 'translateX(0)'
      })),
      state('hidden', style({
        'opacity' : '0',
        'transform' : 'translateX(1200px)'
      })),
      transition('hidden => show', animate(1000)),
      transition('show => hidden', animate(1000))
      
    ])
  ]
})
export class StudyComponent implements OnInit {
  answerState = 'hidden';
  @Input()study:Study | null = null;
  isCanHasAnswer:boolean = false;
  isCanHasPicaard:boolean = true;
  @Input()loggedInUser:LoggedInUser|null = null;
  @Input()index:number = 0;
  @Output()clicked:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private api:ApiService,
     private render:Renderer2,
      el:ElementRef) {}
  notIsCanAnswer(e:MouseEvent) {
    this.isCanHasAnswer = !this.isCanHasAnswer;
    this.onAnimate(e)
    
      
      
      return 
      
    
    //if(this.study && !this.isCanHasAnswer && this.study.answer === 'THERE ARE FOUR LIGHTS!'){
      //console.log(this.isCanHasPicaard);
      
    //   this.fourLights(this.study.answer)
    // }
    

  }
  fravritClicked(e:MouseEvent){
    
    let target = e.target as HTMLElement
    console.log(target);
    
    if(target && target.classList.contains('bi-star-fill') ){
    let parent = target.parentElement?.parentElement as HTMLHeadingElement;
    let question = parent.innerText.trim().toLowerCase();
    
    console.log('hittingness')
    if(this.loggedInUser && this.study){
      let id = this.study.id
      this.api.selectFavorite(id);
      
    }
    
  }
  return this.clicked.emit(true);
  }
  onAnimate(e:MouseEvent) {
    console.log(this.isCanHasAnswer)
    this.isCanHasAnswer ? this.answerState = 'show' : this.answerState = 'hidden';
    console.log(this.answerState);
    
  }
  fourLights(answer:string|null|undefined){
    // let url = "https://i.imgur.com/mKtwyFr.jpg";
    // let node = document.getElementsByTagName('h1')[0]

    // if(node){
    //   node.innerText = ''
    //   let img = this.render.createElement('img');
    //   this.render.appendChild(
    //     node,
    //     img
    //   )
    //   this.render.setStyle(img,'width','200px')
    //   this.render.setStyle(img, 'height','200px')
    //   this.render.setAttribute(img, 'src', url);
    //   this.isCanHasPicaard = false;
    // }
      return;
  }
  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x)=> this.loggedInUser = x);
    this.api.onComponentLoad();
  }
}
