import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './../app.service';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http:HttpClient,private appService:AppService) { }

  getActivityTitle(id){
    return this.http.get(this.appService.url+":3000/activity/getTitle?id="+id);
  }

  getActivity(id,actitle_id){
    return this.http.get(this.appService.url+":3000/activity/getActivity?id="+id+"&title="+actitle_id);
  }
}
