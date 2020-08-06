import { Component, OnInit,Inject } from '@angular/core';
import {ActivityService} from './activity.service';
import {CookieService} from 'ngx-cookie-service';
import {AppService} from './../app.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { iif } from 'rxjs';
@Component({
  selector: 'app-acitivity',
  templateUrl: './acitivity.component.html',
  styleUrls: ['./acitivity.component.css']
})
export class AcitivityComponent implements OnInit {

  constructor(private activityService:ActivityService,private cookie:CookieService,private appService:AppService,public dialog:MatDialog) {

  }
  isAdmin = false;
  isEdit = false;
  activityTitle =[];
  activityData=[];

  changeInfo = {
    actitle:[],
    activity:[]
  };

  titleKeyList = [];
  activityKeyList = [];

  selectIdx = 0;

  notShow = -1;
  updateComplete = false;
  newActivity = [];
  errorMsg = "";
  
  timeout:any;
  resetErrMsg:any;
  ngOnInit(): void {
    this.appService.endLoading();
    this.isAdmin = this.appService.isAdmin;
    this.getActivityTitle();
  }
  getActivityTitle(){
    this.changeInfo.activity = [];
    this.changeInfo.actitle = [];
    this.activityTitle =[];
    this.activityData=[];
    var id =this.cookie.get("user_id");
    this.activityService.getActivityTitle(id).subscribe(data=>{
      this.activityTitle = (data as any).result;

      var actitleStringData = JSON.stringify(this.activityTitle[0]);
      var actitleJsonData = JSON.parse(actitleStringData);
      this.titleKeyList = Object.keys(actitleJsonData);

      for(var i = 0 ;i<this.activityTitle.length;i++){
        var changeTitle = {};
          for(var j = 0 ; j < this.titleKeyList.length;j++){
            changeTitle[this.titleKeyList[j]] = this.activityTitle[i][this.titleKeyList[j]];
          }
          this.changeInfo.actitle.push(changeTitle);

          this.activityService.getActivity(id,this.activityTitle[i].actitle_id).subscribe(resultData=>{
          var d=  (resultData as any).result;

          var activityStringData = JSON.stringify(d[0]);
          var activityJsonData = JSON.parse(activityStringData);
          this.activityKeyList = Object.keys(activityJsonData);

          for(var j = 0 ; j <d.length;j++){
            this.activityData.push(d[j]);
            var changeActivity = {};
            for(var x = 0 ; x<this.activityKeyList.length;x++){            
              changeActivity[this.activityKeyList[x]] = d[j][this.activityKeyList[x]];
            } 
            this.changeInfo.activity.push(changeActivity); 
          }                                        
        })
      }
        
    });
  }

  changeBtnClick(){
    this.isEdit = !this.isEdit;
    if(!this.isEdit){      
        this.newActivity = [];
        this.getActivityTitle();
    }
  }  
  editTitle(){
    if(this.changeInfo.actitle[this.selectIdx]["actitle_title"] != this.activityTitle[this.selectIdx]["actitle_title"]){      
      this.activityService.updateActivityTitle(this.changeInfo.actitle[this.selectIdx]["actitle_id"],this.changeInfo.actitle[this.selectIdx]["actitle_title"]).subscribe(updateTitleResult=>{
        this.activityTitle[this.selectIdx]["actitle_title"] = this.changeInfo.actitle[this.selectIdx]["actitle_title"];
        this.viewResultLogo(0);
      })
    }else{
      this.viewResultLogo(1);
    }
  }
  deleteActivity(activity,idx){
    
    const dialogRef = this.dialog.open(Dialog,
      {
        data:{name:activity.activity_title}
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        console.log(this.changeInfo.activity[idx]);
        this.activityService.deleteActivity(this.changeInfo.activity[idx].activity_id).subscribe(result=>{
          this.changeInfo.activity.splice(idx);
          this.viewResultLogo(2);
        })
        
      }      
    })
  }
  editActivity(idx){
    var isChk = false;
    for(var i = 0 ; i < this.activityKeyList.length;i++){
      if(this.changeInfo.activity[idx][this.activityKeyList[i]] != this.activityData[idx][this.activityKeyList[i]]){
        isChk = true;
        this.activityData[idx][this.activityKeyList[i]] = this.changeInfo.activity[idx][this.activityKeyList[i]];
      }
    }
    if(isChk){
      var date =new Date( this.changeInfo.activity[idx].activity_date);
      this.changeInfo.activity[idx].activity_date = new Date(date.getFullYear() + "."+(date.getMonth()+1)+ "."+ date.getDate());
      this.activityService.updateActivity(this.changeInfo.activity[idx]).subscribe(updateAcitvity=>{
        this.viewResultLogo(0);
      })
    }else{
      this.viewResultLogo(1);      
    }    
  }

  viewResultLogo(value){    
    this.notShow = value;    
    this.updateComplete = true;
    if(this.timeout){
      clearTimeout(this.timeout);
      clearTimeout(this.resetErrMsg);
    }
    this.timeout = setTimeout(()=>{
      this.updateComplete = false;          
      this.notShow = -1;
      
    },1500);
    
    this.resetErrMsg = setTimeout(()=>{
      this.errorMsg = "";
    },2000);
  }
  changeTitle(idx){
    this.selectIdx = idx;
  }

  addActivity(){
    this.newActivity.push({
      activity_title:'',
      activity_detail:'',
      activity_date:'',
      activity_publisher:'',
      activity_content:'',
      actitle_id:this.activityTitle[this.selectIdx].actitle_id,
      info_id:this.cookie.get("user_id")
    });    
  }
  deleteNewActivity(idx){
    this.newActivity.splice(idx);
  }
  addNewActivity(idx){
    var chk = false;
    var date = new Date(this.newActivity[idx].activity_date );
    this.newActivity[idx].activity_date = (new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()));
    if(this.timeout){
      this.errorMsg = "";
    }
    for(var i = 0 ; i < this.activityKeyList.length;i++){      
      if(this.newActivity[idx][this.activityKeyList[i]] == "" || this.newActivity[idx][this.activityKeyList[i]] == null ||(this.newActivity[idx][this.activityKeyList[i]] + "").indexOf('Date') != -1){
        
        switch(this.activityKeyList[i]){
          case "activity_title":
            this.errorMsg += "이름, ";
          break;
          case "activity_detail":
            this.errorMsg += "등급, ";
          break;
          case "activity_date":
            this.errorMsg += "취득 일자, ";
          break;
          case "activity_publisher":
            this.errorMsg += "발급처, ";
          break;            
        }        
        chk = true;
      }
    }
    if(!chk){
      this.activityService.addNewActivity(this.newActivity[idx]).subscribe(result=>{
        this.viewResultLogo(0);
        this.newActivity.splice(idx);
        this.getActivityTitle();
      })    
    }else{
      this.errorMsg = this.errorMsg.substring(0,this.errorMsg.length-2);      
      this.viewResultLogo(3);      
    }
    console.log(this.newActivity[idx]);
  }
}
@Component({
  selector:'dialog-message',
  templateUrl:'dialog.html',
  styleUrls: ['./acitivity.component.css']
})
export class Dialog{
  test:any;
  constructor(public dialogRef:MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  onClick(val){
    this.dialogRef.close(val);
  }  
}