import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './../app.service';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient,private appService:AppService) { }

  getProjectList(project_id){
    return this.http.get(this.appService.url+":3000/project/list?project_id="+project_id);
  }

  deleteProject(id){
    console.log(id);
    return this.http.post(this.appService.url+":3000/project/deleteproject",{id:id});
  }
  editProject(form){
    return this.http.post(this.appService.url+":3000/project/editproject",{form:form});
  }

  addProject(form){
    return this.http.post(this.appService.url+":3000/project/addproject",{form:form});
  }


  uploadImg(form){
    return this.http.post(this.appService.url+":3000/project/insertimg",{form:form})
  }

  getImgList(params){    
    return this.http.get(this.appService.url+":3000/project/getimglist?project_id="+params.project_id+"&career_id="+params.career_id);
  }

  editPicture(form){
    return this.http.post(this.appService.url+":3000/project/editpicture",{form:form});
  }

  deletePicture(id){
    
    return this.http.post(this.appService.url+":3000/project/deletepicture",{id:id});
  }
}
