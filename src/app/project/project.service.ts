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
}
