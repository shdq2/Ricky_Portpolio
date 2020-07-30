import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http:HttpClient) { }

  getActivityTitle(id){
    return this.http.get("http://52.79.240.154:3000/activity/getTitle?id="+id);
  }

  getActivity(id,actitle_id){
    return this.http.get("http://52.79.240.154:3000/activity/getActivity?id="+id+"&title="+actitle_id);
  }
}
