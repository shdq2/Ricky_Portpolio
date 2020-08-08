import { Component } from '@angular/core';
import {AppService} from './app.service';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portpolio';
  
  viewService;
  loginForm={
    id:'',
    pw:''
  }
  constructor(private appService:AppService,private cookie:CookieService){
    
    this.viewService = appService;
    if(cookie.get("admin") == "true"){
      appService.isAdmin = true;      
    }    
    if(cookie.get("user_id") != ""){
      appService.isLoading = true;
    }
  }
}
