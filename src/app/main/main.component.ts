import { Component, OnInit, Renderer2,ViewChild,ElementRef } from '@angular/core';
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
  TitleText =[];
  currentTitle;
  isAdmin = false;
  isEdit = false;
  isEditIdx = -1;
  changeInfo = { 
    userData:{
      info_name:"",
      info_nickname:'',
      info_email:'',
      info_eng_name:'',
      info_phone:'',
      info_git:'',
      info_littlement:''
    },
    career:[]
   };
  userData = {
    info_name:'',
    info_nickname:'',
    info_email:'',
    info_eng_name:'',
    info_phone:'',
    info_git:'',
    info_littlement:''
  };
  careerData = [];
  originCareer = [];
  keyList = [];
  careerKeyList = [];



  viewInsert:object[];
  constructor(private mainService:MainService,private router:Router, private cookie:CookieService,private appService:AppService,private renderer:Renderer2) {    
    if(cookie.get("user_id") == ""){
      router.navigate(['login']);
    }
    this.isAdmin = appService.isAdmin;
    this.getInfo();
    this.viewInsert = [];
  }

  ngOnInit(): void {    
    this.writeTitle();
  }

  getInfo(){
    this.changeInfo.career=[];
    var id = this.cookie.get("user_id");
    this.mainService.getUserInfo(id).subscribe(data=>{
      this.userData = (data as any).result[0];                
      var originStringData = JSON.stringify(this.userData);
      var originJsonData = JSON.parse(originStringData);
      this.keyList = Object.keys(originJsonData);
      for(var i= 0 ;i<this.keyList.length;i++){        
        this.changeInfo.userData[this.keyList[i]] = this.userData[this.keyList[i]];        
      }
      this.mainService.getCareerInfo(id).subscribe(data=>{        
        this.careerData = (data as any).result;     
        
        var careerStringData = JSON.stringify(this.careerData[0]);
        var careerJsonData = JSON.parse(careerStringData);
        this.careerKeyList = Object.keys(careerJsonData);
        
        this.appService.endLoading();
        for(var i = 0 ; i < this.careerData.length;i++){
          var career={};
          for(var j = 0 ; j < this.careerKeyList.length;j++){
            career[this.careerKeyList[j]] = this.careerData[i][this.careerKeyList[j]];
          }
          
          this.careerData[i].career_startDate = new Date(this.careerData[i].career_startDate).getFullYear()+"."+(new Date(this.careerData[i].career_startDate).getMonth()+1)+"."+new Date(this.careerData[i].career_startDate).getDate()
          
          if(this.careerData[i].career_endDate == null){
            this.careerData[i].career_endDate = "재직중";
          }else{
            this.careerData[i].career_endDate = new Date(this.careerData[i].career_endDate).getFullYear()+"."+(new Date(this.careerData[i].career_endDate).getMonth()+1)+"."+new Date(this.careerData[i].career_endDate).getDate()
          }

          this.changeInfo.career.push(career);          
        }
        
        this.mainService.getTitleTiping(id).subscribe(titleData=>{
          if((titleData as any).err == null){
            for(var i = 0 ; i <(titleData as any).result.length;i++){              
              this.TitleText.push((titleData as any).result[i].title_text);
            }
          }
        })
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
  changeBtnClick(){

    this.isEdit = !this.isEdit;
    
    var isChk = true;    
    if(!this.isEdit){      
      
      for(var i= 0 ;i<this.keyList.length;i++){
        if(this.changeInfo.userData[this.keyList[i]] == ""){
          this.changeInfo.userData[this.keyList[i]] = this.userData[this.keyList[i]];
        }
        if(this.changeInfo.userData[this.keyList[i]] != this.userData[this.keyList[i]]){    
          isChk = false;    
        }
      }
      
      if(!isChk){
        this.mainService.editAbout(this.cookie.get("user_id"),this.changeInfo.userData).subscribe(editAboutData=>{          
        });
      }
      
      for(var i = 0 ; i < this.changeInfo.career.length;i++){
        var career = this.changeInfo.career[i];        
        
        var startdate = new Date(career.career_startDate);
        career.career_startDate = startdate.getFullYear()+"." + (startdate.getMonth()+1)+"."+startdate.getDate();

        if(career.career_endDate != null){
          var enddate = new Date(career.career_endDate);
          career.career_endDate = enddate.getFullYear()+"." + (enddate.getMonth()+1)+"."+enddate.getDate();          
          
        }
        if(this.careerData[i].career_endDate == "재직중"){            
          this.careerData[i].career_endDate = null;
        }

        for(var j = 0 ; j < this.careerKeyList.length;j++){          
          if(career[this.careerKeyList[j]] != this.careerData[i][this.careerKeyList[j]]){ 
            if(career.career_endDate != null){
              career.career_endDate = "\""+career.career_endDate+"\"";
            }
            this.mainService.editCareer(this.cookie.get("user_id"),career).subscribe(editCareerData=>{                                      
            });
            break;
          }
          
        }
        
        
      }

      if(this.viewInsert.length>0){
        
        for(var i = 0 ; i < this.viewInsert.length;i++){
          var isInsert = true;
          for(var j = 0 ; j < this.careerKeyList.length;j++){
            if(this.careerKeyList[j] != "career_endDate" && this.careerKeyList[j] != "career_id"){
              if(this.viewInsert[i][this.careerKeyList[j]] == "" || this.viewInsert[i][this.careerKeyList[j]] == null ){
                
                isInsert = false;
                console.log(this.viewInsert[i][this.careerKeyList[j]] , this.viewInsert[i][this.careerKeyList[j]],isInsert);
                break;
              }
              
            }            
          }
          if(isInsert){            
            
              var startdate = new Date(this.viewInsert[i]["career_startDate"]);
              this.viewInsert[i]["career_startDate"] = startdate.getFullYear()+"." + (startdate.getMonth()+1)+"."+startdate.getDate();

              if(this.viewInsert[i]["career_endDate"] != null){
                var enddate = new Date(this.viewInsert[i]["career_endDate"]);
                this.viewInsert[i]["career_endDate"] ="\""+ enddate.getFullYear()+"." + (enddate.getMonth()+1)+"."+enddate.getDate()+"\"";          
              }                            
              this.mainService.insertCareer(this.viewInsert[i]).subscribe(insertData=>{
                this.viewInsert = [];
              })
            
          }
        }
      }
      
      this.getInfo();
    }       
    
  }
  deleteEndDate(id){
    
      this.changeInfo.career[id].career_endDate = null;      
  }

  deleteNewDate(id){
    console.log(id);
    this.viewInsert[id]["career_endDate"] = null;      
}

  addCareer(){      

      this.viewInsert.push(  {
        career_company:'',
        career_startDate:'',
        career_endDate:null,
        career_role:'',
        info_id:this.cookie.get("user_id")
      });      
      
  }
  deleteCareer(id){
    console.log(id);
  }

  deleteNewCareer(idx){
    this.viewInsert.splice(idx);    
  }
}
