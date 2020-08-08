import { Component, OnInit } from '@angular/core';
import {AppService} from './../app.service';
import {LoginService} from './login.service'
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_type = -1;
  isChk = true;
  constructor(private appService:AppService,private loginService:LoginService,private router:Router,private cookie:CookieService) {
    this.appService.clearCache();
   }
  loginForm={
    id:'',
    pw:''
  }

  ngOnInit(): void {   
    

  }

  login(){
    if(this.login_type == 0 || this.login_type == -1){
      this.loginService.loginChk(this.loginForm.id).subscribe(data=>{
        
        if((data as any).result[0].user_count == 1){
          this.cookie.set('user_id',this.loginForm.id,1);
          
          this.appService.SuccessLogin();
          this.isChk = false;
          setTimeout(()=>{
            this.router.navigate(['main',this.loginForm.id]);
          },3000)
          
        }else{
          alert("failed find User");
        }
      })
    }else{
      this.loginService.login(this.loginForm).subscribe(data=>{
        var loginData = (data as any).result[0];
        if(loginData != null){  
          this.appService.isAdmin = true;
          this.cookie.set('user_id',this.loginForm.id,1);
          this.cookie.set('admin',"true");
          this.router.navigate(['main',this.loginForm.id]);
        }else{
          alert("data Error");
        }        
      })
    }    
  }

  change_login_type(type){
    this.login_type = type;
  }
}
