import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjectService} from './project.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService:ProjectService,private acRoute:ActivatedRoute) {
    
   }
   projectList = [];
  ngOnInit(): void {
    var jsonParams = JSON.stringify(this.acRoute.params);
    var params = JSON.parse(jsonParams)._value;    
    this.getProjectList(params.id);
  }

  getProjectList(project_id){
    this.projectService.getProjectList(project_id).subscribe(data=>{
      this.projectList = (data as any).result;                      
    })
  }

 
}
