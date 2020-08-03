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
  constructor(private appService:AppService,private loginService:LoginService,private router:Router,private cookie:CookieService) { }
  loginForm={
    id:'',
    pw:''
  }

  ngOnInit(): void {
    if(this.cookie.get("user_id") != ""){
      this.router.navigate(['main']);
    }
  }

  login(){
    if(this.login_type == 0 || this.login_type == -1){
      this.loginService.loginChk(this.loginForm.id).subscribe(data=>{
        
        if((data as any).result[0].user_count == 1){
          this.cookie.set('user_id',this.loginForm.id,1);
          
          this.appService.SuccessLogin();
          this.isChk = false;
          setTimeout(()=>{
            this.router.navigate(['main']);
          },3000)
          
        }else{
          alert("failed find User");
        }
      })
    }else{
      this.loginService.login(this.loginForm).subscribe(data=>{
        console.log(data);
      })
    }    
  }

  change_login_type(type){
    this.login_type = type;
  }
}
