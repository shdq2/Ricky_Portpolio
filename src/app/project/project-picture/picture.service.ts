import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http : HttpClient,private appService:AppService) { }

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
