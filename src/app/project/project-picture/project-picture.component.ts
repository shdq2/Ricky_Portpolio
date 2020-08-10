import { Component, OnInit } from '@angular/core';
import {AppService} from './../../app.service';
import {ProjectService} from './../project.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-project-picture',
  templateUrl: './project-picture.component.html',
  styleUrls: ['./project-picture.component.css']
})
export class ProjectPictureComponent implements OnInit {

  defaultImg ="assets/img/defaultPictureImg.jpg";
  activeProject={
    imgSrc:this.defaultImg,
    context:""
  }
  params:any;
  pictureList = [];
  isAddChk = true;

  selectIdx = -1;
  setImgChk = false;
  constructor(private appService:AppService,private pictureService:ProjectService,private acRoute:ActivatedRoute,private cookie:CookieService) {  
    this.appService.endLoading(); 
    var jsonParams = JSON.stringify(this.acRoute.params);
    this.params = JSON.parse(jsonParams)._value;         
    appService.user_id = cookie.get("user_id");   
   }

  
  ngOnInit(): void {
    this.getPictureList();
  }
  getPictureList(){
    
    this.pictureService.getImgList(this.params).subscribe(data=>{
      this.pictureList = (data as any).result;
      for(var i = 0 ; i < this.pictureList.length;i++){
        var url = "";
        for(var j = 0 ; j <this.pictureList[i].propic_img.data.length;j++){
          url += String.fromCharCode(this.pictureList[i].propic_img.data[j]);
        }              
        this.pictureList[i].propic_img = url;
      }
    })
    
  }

  imgChange(files){
    var file = files[0];
    var reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = ()=>{      
      this.activeProject.imgSrc = reader.result.toString();
      this.setImgChk = true;
    }

  }
  uploadImg(){
    if(!this.setImgChk){
     // return;
    }   
    var uploadData = {
      imgSrc:this.activeProject.imgSrc,
      context:this.activeProject.context,
      career_id:this.params.career_id,
      info_id:this.cookie.get("user_id"),
      project_id:this.params.project_id
    }    
    
    this.pictureService.uploadImg(uploadData).subscribe(result=>{
      if((result as any).err){
        console.log(result);
        return;
      }
      
        this.activeProject.imgSrc = this.defaultImg;
        this.activeProject.context = "";
        this.selectIdx = -1;
        
      this.getPictureList();
    })
  }

  selectPicture(idx){
    this.selectIdx = idx;
    this.activeProject.imgSrc = this.pictureList[this.selectIdx].propic_img;
    this.activeProject.context = this.pictureList[this.selectIdx].propic_content;
    
    this.isAddChk = false;
  }

  addPicture(){
    this.isAddChk = true;
    this.selectIdx = -1;
    this.activeProject.imgSrc = this.defaultImg;
    this.activeProject.context = "";
  }

  editpicture(){
    if(this.pictureList[this.selectIdx].propic_img == this.activeProject.imgSrc && this.pictureList[this.selectIdx].context == this.activeProject.context){
      alert("변경사항이 없습니다.");
      return;
    }
    var uploadData = {
      picture_id:this.pictureList[this.selectIdx].propic_id,
      imgSrc:this.activeProject.imgSrc,
      context:this.activeProject.context,      
    }

    this.pictureService.editPicture(uploadData).subscribe(result=>{
      console.log(result);
    })
  }
  deletePicture(){
    this.pictureService.deletePicture(this.pictureList[this.selectIdx].propic_id).subscribe(result=>{
      if((result as any).err){
        return;
      }

      this.activeProject.imgSrc = this.defaultImg;
      this.activeProject.context = "";
      this.pictureList.splice(this.selectIdx);
      this.selectIdx = -1;
      
    })
  }
}
