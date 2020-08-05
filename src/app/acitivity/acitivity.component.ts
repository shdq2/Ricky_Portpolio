import { Component, OnInit,Inject } from '@angular/core';
import {ActivityService} from './activity.service';
import {CookieService} from 'ngx-cookie-service';
import {AppService} from './../app.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
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
        // for(var i = 0 ; i < this.changeInfo.actitle.length;i++){          
        //   if(this.changeInfo.actitle[i]["actitle_title"] != this.activityTitle[i]["actitle_title"]){
        //     this.activityService.updateActivityTitle(this.changeInfo.actitle[i]["actitle_id"],this.changeInfo.actitle[i]["actitle_title"]).subscribe(updateTitleResult=>{
        //       console.log(updateTitleResult)
        //     })
        //     console.log(i+"번째가 다름");
        //   }
        // }

        // for(var i = 0 ; i<this.changeInfo.activity.length;i++){
        //   var isChk = true;
        //   for(var j = 0 ; j < this.activityKeyList.length;j++){
        //     if(this.changeInfo.activity[i][this.activityKeyList[j]] != this.activityData[i][this.activityKeyList[j]]){              
        //       isChk = false;              
        //       break;
        //     }
        //   }
        //   if(!isChk){
        //     var date =new Date( this.changeInfo.activity[i].activity_date);
        //     this.changeInfo.activity[i].activity_date = date.getFullYear() + "."+(date.getMonth()+1)+ "."+ date.getDate();
        //     this.activityService.updateActivity(this.changeInfo.activity[i]).subscribe(updateAcitvity=>{
        //       console.log(updateAcitvity);
        //     })
        //     console.log(i+"번째 update문 실행");
        //   }
        // }
        this.getActivityTitle();
    }
  }  
  editTitle(){
    if(this.changeInfo.actitle[this.selectIdx]["actitle_title"] != this.activityTitle[this.selectIdx]["actitle_title"]){      
      this.activityService.updateActivityTitle(this.changeInfo.actitle[this.selectIdx]["actitle_id"],this.changeInfo.actitle[this.selectIdx]["actitle_title"]).subscribe(updateTitleResult=>{
        this.activityTitle[this.selectIdx]["actitle_title"] = this.changeInfo.actitle[this.selectIdx]["actitle_title"];
        this.notShow = 0;

        this.updateComplete = true;
        setTimeout(()=>{
          this.updateComplete = false; 
          this.notShow = -1;         
        },1500);
      })
    }else{
      this.notShow = 1;
      this.updateComplete = true;
      setTimeout(()=>{
        this.updateComplete = false; 
        this.notShow = -1;         
      },1500);
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
      this.changeInfo.activity[idx].activity_date = date.getFullYear() + "."+(date.getMonth()+1)+ "."+ date.getDate();
      this.activityService.updateActivity(this.changeInfo.activity[idx]).subscribe(updateAcitvity=>{
        this.notShow = 0;
        this.updateComplete = true;
        setTimeout(()=>{
          this.updateComplete = false; 
          this.notShow = -1;         
        },1500);
      })
    }else{
      this.notShow = 1;
      this.updateComplete = true;
      setTimeout(()=>{
        this.updateComplete = false;          
        this.notShow = -1;
      },1500);
    }
    console.log(this.changeInfo.activity[0].activity_date);
  }

  changeTitle(idx){
    this.selectIdx = idx;
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