import { Injectable } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url;
  constructor(private acRouter:ActivatedRoute) {     
    var urlData = window.location.href.substring(0,window.location.href.lastIndexOf(":"));
    this.url = urlData;    
  }
}
