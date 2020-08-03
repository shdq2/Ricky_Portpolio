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
  url;
  constructor(private acRouter:ActivatedRoute,private http:HttpClient,private cookie:CookieService) {     
    var urlData = window.location.href.substring(0,window.location.href.lastIndexOf(":"));
    this.url = urlData;    
    if(cookie.get("user_id") != ""){
      this.SuccessLogin();
    }
  }

  SuccessLogin(){
    //this.isLogin = true;
    this.isLoading = true;
    console.log("test")
  } 
  endLoading(){
    this.EndLoading = true;    
    console.log(this.EndLoading);
    
  }
}
