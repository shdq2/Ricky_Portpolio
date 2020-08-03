import { Component, OnInit } from '@angular/core';
import {MainService} from './main.service';
import {Router,ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import {AppService} from './../app.service';
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
  userData = {
    info_name:'',
    info_nickname:'',
    info_email:'',
    info_eng_name:'',
    info_phone:'',
    info_git:''
  };
  careerData = [];
  constructor(private mainService:MainService,private router:Router, private cookie:CookieService,private appService:AppService) {    
    if(cookie.get("user_id") == ""){
      router.navigate(['login']);
    }
    
    this.getInfo(cookie.get("user_id"));
  }

  ngOnInit(): void {    
    this.writeTitle();
  }

  getInfo(id){
    this.mainService.getUserInfo(id).subscribe(data=>{
      this.userData = (data as any).result[0];          
      this.mainService.getCareerInfo(id).subscribe(data=>{
        this.careerData = (data as any).result;                 
        this.appService.endLoading();
      })  
    })
    
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
