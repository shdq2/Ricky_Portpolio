import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) { }

  getUserInfo(id){
    //return this.http.post('http://52.79.240.154:3000/')
    return this.http.post('http://52.79.240.154:3000/user/info',{id:id});
  }

  getCareerInfo(id){
    return this.http.get('http://52.79.240.154:3000/user/careerInfo?id='+id);
  }
}
