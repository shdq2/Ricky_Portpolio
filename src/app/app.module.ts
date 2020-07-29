import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRouterModule } from './app.router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ProjectComponent } from './project/project.component';
import { AcitivityComponent } from './acitivity/acitivity.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,    
    ProjectComponent,
    AcitivityComponent,    
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
