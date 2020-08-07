import { Component, OnInit, Renderer2,Inject } from '@angular/core';
import {MainService} from './main.service';
import {Router,ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service'
import {AppService} from './../app.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

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
  isInfo = true;
  defaultImg = "assets/img/default.png";
  changeInfo = { 
    userData:{
      info_name:"",
      info_nickname:'',
      info_email:'',
      info_eng_name:'',
      info_phone:'',
      info_git:'',
      info_littlement:'',
      info_picture:this.defaultImg
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
    info_littlement:'',
    info_picture:''
  };
  careerData = [];
  originCareer = [];
  keyList = [];
  careerKeyList = [];

  changeTitle = [];
  newTitleTiping = [];
  viewInsert:object[];
  
  constructor(private mainService:MainService,private router:Router, private cookie:CookieService,private appService:AppService,public dialog:MatDialog) {    
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

  changeImg(files){
    var file = files[0];
    var reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = ()=>{      
      this.changeInfo.userData.info_picture = reader.result.toString();      
      
    }
  }
  clickImg(img){
    if(this.isEdit == false || this.isAdmin == false){
      return
    }
    img.click();    
  }

  setDefaultImg(){
    this.changeInfo.userData.info_picture =this.defaultImg;
  }
  getInfo(){
    this.changeInfo.career=[];
    this.changeTitle = [];
    this.TitleText = [];
    var id = this.cookie.get("user_id");
    this.mainService.getUserInfo(id).subscribe(data=>{
      
      if((data as any).result.length > 0 ){
        this.userData = (data as any).result[0];                
        var originStringData = JSON.stringify(this.userData);
        var originJsonData = JSON.parse(originStringData);
        this.keyList = Object.keys(originJsonData);
        for(var i= 0 ;i<this.keyList.length;i++){        
          
          if(this.keyList[i] == "info_picture"){          
            if(this.userData[this.keyList[i]] == "" || this.userData[this.keyList[i]] == null){            
              this.changeInfo.userData[this.keyList[i]] = this.defaultImg;  
            }else{
              var url = "";
              for(var x = 0 ; x < this.userData[this.keyList[i]].data.length;x++){
                url +=String.fromCharCode(this.userData[this.keyList[i]].data[x]);
              }
              this.changeInfo.userData[this.keyList[i]] = url;  
            }
          }else{
            this.changeInfo.userData[this.keyList[i]] = this.userData[this.keyList[i]];        
          }        
          
        }
      }else{
        this.isInfo = false;
      }
      
      this.mainService.getCareerInfo(id).subscribe(data=>{        
        
        if((data as any).result.length > 0 ){
          this.careerData = (data as any).result;     
        
          var careerStringData = JSON.stringify(this.careerData[0]);
          var careerJsonData = JSON.parse(careerStringData);
          this.careerKeyList = Object.keys(careerJsonData);
          
          
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
          
        }
        
        this.mainService.getTitleTiping(id).subscribe(titleData=>{
          
          if((titleData as any).err == null){            
            for(var i = 0 ; i <(titleData as any).result.length;i++){              
              this.TitleText.push((titleData as any).result[i].title_text);
              this.changeTitle.push({
                title_id:(titleData as any).result[i].title_id,
                title_text:(titleData as any).result[i].title_text
              });
            }
            this.appService.endLoading();
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
          console.log(this.changeInfo.userData[this.keyList[i]] != this.userData[this.keyList[i]]);
          isChk = false;    
        }
      }
      if(!this.isInfo){      
        this.changeInfo.userData["info_id"] = this.cookie.get("user_id");

        this.mainService.addAbout(this.changeInfo.userData).subscribe(editAboutData=>{          
          
        });
      }      
      if(!isChk){        
        if(this.isInfo){
          this.mainService.editAbout(this.cookie.get("user_id"),this.changeInfo.userData).subscribe(editAboutData=>{          
            console.log(editAboutData);
          });
        }
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
      for(var i = 0 ; i < this.TitleText.length;i++){
        if(this.TitleText[i] != this.changeTitle[i].title_text){
          this.mainService.updateTitle(this.changeTitle[i].title_id,this.changeTitle[i].title_text).subscribe(data=>{            
          })
        }
      }

      for(var i = 0 ; i < this.newTitleTiping.length;i++){
        if(this.newTitleTiping[i].title_text != ""){
          this.mainService.addTitle(this.newTitleTiping[i].title_text,this.newTitleTiping[i].info_id).subscribe(data=>{
            if((data as any).err){
              console.log(data);
              return;
            }
            
          })  
        }
        
      }
      this.newTitleTiping = [];
      this.getInfo();
    }       
    
  }

  removeTitle(idx,title){
    this.mainService.removeTitle(title.title_id).subscribe(data=>{
      console.log(data);
      if((data as any).err){
        return;
      }      
      this.changeTitle.splice(idx);
    })    
  }
  removeNewTitle(idx){
    this.newTitleTiping.splice(idx);
  }
  deleteEndDate(id){
    
      this.changeInfo.career[id].career_endDate = null;      
  }

  deleteNewDate(id){
    
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
  deleteCareer(career,idx){
    const dialogRef = this.dialog.open(Dialog,
      {
        data:{career:career}
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.mainService.removeCareer(career.career_id).subscribe(data=>{
          this.careerData.splice(idx);
          this.changeInfo.career.splice(idx);
        })    
      }      
    })
  }

  deleteNewCareer(idx){
    this.viewInsert.splice(idx);    
  }

  addTiping(){
    this.newTitleTiping.push({
      title_text:'',
      info_id:this.cookie.get("user_id")
    })
  }
}


@Component({
  selector:'dialog-message',
  templateUrl:'dialog.html',
  styleUrls: ['./main.component.css']
})
export class Dialog{
  test:any;
  constructor(public dialogRef:MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  onClick(val){
    this.dialogRef.close(val);
  }  
}