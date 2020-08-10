import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLogin = false;
  isLoading = false;
  EndLoading = false;
  isAdmin =false;
  url;
  user_id;
  constructor(private acRouter:ActivatedRoute,private http:HttpClient,private cookie:CookieService) {     
    var urlData = window.location.href.substring(0,window.location.href.lastIndexOf(":"));
    this.url = urlData;    
    
  }

  SuccessLogin(){
    //this.isLogin = true;
    this.isLoading = true;    
  } 
  endLoading(){
    this.EndLoading = true; 
    console.log("test");   
  }

  clearCache(){
    this.EndLoading = false;
    this.isLoading = false;
    this.isAdmin = false;
    this.cookie.deleteAll();
  }
}
