import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cursorToggle=false;
  reverse = false;
  currentTitleIdx = 0;
  TitleText =["Developer","Ricky's Web"];
  currentTitle;
  constructor() { }

  ngOnInit(): void {    
    this.writeTitle();
  }

  writeTitle(){
    var idx = 0;
    var interval = setInterval(()=>{      
    this.currentTitle = this.TitleText[this.currentTitleIdx].substring(0,idx);
    if(idx < this.TitleText[this.currentTitleIdx].length){
      idx++;
    }else{          
      this.cursorToggle = !this.cursorToggle;    
      this.currentTitleIdx++;
      if(this.currentTitleIdx == this.TitleText.length){
        this.currentTitleIdx = 0;
      }
      clearInterval(interval);
      setTimeout(()=>{
        this.deleteTitle();
      },3000);
    }
      
      
    },200);
  }
  deleteTitle(){
    var interval = setInterval(()=>{
      this.currentTitle = this.currentTitle.substring(0,this.currentTitle.length-1);        
      if(this.currentTitle.length == 0){        
        this.cursorToggle = false;
        clearInterval(interval);
        setTimeout(()=>{
          this.writeTitle();
        },1000);
      }
    },100);
  }
}
