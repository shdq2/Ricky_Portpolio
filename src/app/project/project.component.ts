import { Component, OnInit ,Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProjectService} from './project.service';
import {AppService} from './../app.service';
import {NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service'
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  isModal = false;
  isAdmin = false;
  isEdit = false;

  changeInfo = [];
  projectKeyList = [];
  newProject = [];
  params;
  constructor(private projectService:ProjectService,private acRoute:ActivatedRoute,private modal:NgbModal,private appService: AppService,private cookie:CookieService,private dialog:MatDialog,private router:Router) {
    if(cookie.get("admin")){
      this.isAdmin = true;
    }
   }
   projectList = [];
  ngOnInit(): void {
    var jsonParams = JSON.stringify(this.acRoute.params);
    this.params = JSON.parse(jsonParams)._value;    
    this.getProjectList();
    this.appService.endLoading();
    
  }

  getProjectList(){
    var project_id = this.params.id;
    this.changeInfo = [];
    this.projectService.getProjectList(project_id).subscribe(data=>{        
      if((data as any).err){
        return;
      }      
      
      this.projectList = (data as any).result;
      var projectStringData = JSON.stringify(this.projectList[0]);
      var projectJsonData = JSON.parse(projectStringData);
      this.projectKeyList = Object.keys(projectJsonData);
      for(var i = 0 ; i < this.projectList.length;i++){
        var projectItem = {};
          for(var j = 0 ; j<this.projectKeyList.length;j++){
            projectItem[this.projectKeyList[j]] = this.projectList[i][this.projectKeyList[j]];
          }
          this.changeInfo.push(projectItem);
      }      
    })
  }

  onDetailPicture(){    
    this.isModal = !this.isModal;
  }
  changeBtnClick(){
    this.isEdit = !this.isEdit;

    this.getProjectList();
  }
  deleteProject(item,idx){
    const dialogRef = this.dialog.open(Dialog,
      {
        data:{name:item.project_name}
      });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){                
        this.projectService.deleteProject(item.project_id).subscribe(result=>{
          this.projectList.splice(idx); 
          this.changeInfo.splice(idx);                
        })        
      }      
    })
  }

  editProject(project,idx){
    var isChk = true;
    
    for(var i = 0 ; i < this.projectKeyList.length;i++){
      if(project[this.projectKeyList[i]] != this.projectList[idx][this.projectKeyList[i]]){
        isChk = false;
        break;
      }
    }    
    if(!isChk){
      var startDate = new Date(project.project_startDate);
      project.project_startDate = (startDate.getFullYear()+"."+(startDate.getMonth()+1)+"."+startDate.getDate());
      
      var endDate = new Date(project.project_endDate);
      project.project_endDate = (endDate.getFullYear()+"."+(endDate.getMonth()+1)+"."+endDate.getDate());      
      
      this.projectService.editProject(project).subscribe(result=>{
        if((result as any).err){
        
          return;
        }
        project.project_endDate = new Date(project.project_endDate);
        project.project_startDate = new Date(project.project_startDate);
        
      })      
    }
  }
  addproject(){
    this.newProject.push({
      project_name:'',
      project_startDate:'',
      project_endDate:'',
      project_explanation:'',
      project_account:'',
      info_id:this.cookie.get("user_id"),
      career_id:this.params.id
    })
  }
  deleteNewProject(idx){
    this.newProject.splice(idx);
  }
  addNewProject(project,idx){

    for(var i = 0 ; i < this.projectKeyList.length;i++){
      if(project[this.projectKeyList[i]] == ""){
          return;
      }
    }
    var startDate = new Date(project.project_startDate);
      project.project_startDate = (startDate.getFullYear()+"."+(startDate.getMonth()+1)+"."+startDate.getDate());
      
      var endDate = new Date(project.project_endDate);
      project.project_endDate = (endDate.getFullYear()+"."+(endDate.getMonth()+1)+"."+endDate.getDate());      

    this.projectService.addProject(project).subscribe(result=>{
      this.newProject.splice(idx);        
      project.project_endDate = new Date(project.project_endDate);
      project.project_startDate = new Date(project.project_startDate);
      this.changeInfo.push(project);
    })
  }
  addPicture(idx){
   this.router.navigate(['/project_picture',this.params.id,this.projectList[idx].project_id]) ;
  }
}

@Component({
  selector:'dialog-message',
  templateUrl:'dialog.html',
  styleUrls: ['./../acitivity/acitivity.component.css']
})
export class Dialog{
  test:any;
  constructor(public dialogRef:MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  onClick(val){
    this.dialogRef.close(val);
  }  
}
