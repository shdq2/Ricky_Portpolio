import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjectService} from './project.service';
import {NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  isModal = false;
  constructor(private projectService:ProjectService,private acRoute:ActivatedRoute,private modal:NgbModal) {
    
   }
   projectList = [];
  ngOnInit(): void {
    var jsonParams = JSON.stringify(this.acRoute.params);
    var params = JSON.parse(jsonParams)._value;    
    this.getProjectList(params.id);
  }

  getProjectList(project_id){
    this.projectService.getProjectList(project_id).subscribe(data=>{  
      console.log(data);    
      if((data as any).err){
        return;
      }      
      this.projectList = (data as any).result;          
    })
  }

  onDetailPicture(){    
    this.isModal = !this.isModal;
  }
}
