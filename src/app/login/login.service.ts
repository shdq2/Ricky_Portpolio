import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppService} from './../app.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient,private appService:AppService) { }

  loginChk(id){
    return this.http.get(this.appService.url+":3000/user/chk?id="+id);
  }

  login(form){
    return this.http.post(this.appService.url+":3000/user/login",{id:form.id,pw:form.pw});
  }

  
}
