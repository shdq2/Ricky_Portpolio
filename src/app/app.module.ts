import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRouterModule } from './app.router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectComponent } from './project/project.component';
import { AcitivityComponent } from './acitivity/acitivity.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectPictureComponent } from './project/project-picture/project-picture.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,    
    ProjectComponent,
    AcitivityComponent,
    LoginComponent,
    ProjectPictureComponent,
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
