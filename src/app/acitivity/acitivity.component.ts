import { Component, OnInit } from '@angular/core';
import {ActivityService} from './activity.service';
@Component({
  selector: 'app-acitivity',
  templateUrl: './acitivity.component.html',
  styleUrls: ['./acitivity.component.css']
})
export class AcitivityComponent implements OnInit {

  constructor(private activityService:ActivityService) {

  }
  activityTitle =[];
  activityData=[];
  ngOnInit(): void {
    this.getActivityTitle("shdq");
  }
  getActivityTitle(id){
    this.activityService.getActivityTitle(id).subscribe(data=>{
      this.activityTitle = (data as any).result;      
      for(var i = 0 ;i<this.activityTitle.length;i++){
        this.activityService.getActivity(id,this.activityTitle[i].actitle_id).subscribe(resultData=>{
          var d=  (resultData as any).result;                
          for(var j = 0 ; j <d.length;j++){
            this.activityData.push(d[j]);
          }                    
        })
      }      
    });
  }
}
