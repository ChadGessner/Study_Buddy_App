import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Study } from '../Interfaces/study.interface';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  @Input()study:Study | null = null;
  isCanHasAnswer:boolean = false;
  isCanHasPicaard:boolean = true;
  constructor(private render:Renderer2, el:ElementRef) {}
  notIsCanAnswer() {
    
    if(this.study && !this.isCanHasAnswer && this.study.answer === 'THERE ARE FOUR LIGHTS!'){
      console.log(this.isCanHasPicaard);
      
      this.fourLights(this.study.answer)
    }
    this.isCanHasAnswer = !this.isCanHasAnswer;
  }
  fourLights(answer:string|null|undefined){
    let url = "https://i.imgur.com/mKtwyFr.jpg";
    let node = document.getElementsByTagName('h1')[0]
    console.log(node);
    
    if(node){
      node.innerText = ''
      let img = this.render.createElement('img');
      this.render.appendChild(
        node,
        img
      )
      this.render.setStyle(img,'width','200px')
      this.render.setStyle(img, 'height','200px')
      this.render.setAttribute(img, 'src', url);
      this.isCanHasPicaard = false;
    }
      
      
      return;
      
  }
  ngOnInit(): void {
    
  }
}
