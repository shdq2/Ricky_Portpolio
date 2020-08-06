import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {AcitivityComponent} from './acitivity/acitivity.component';
import {ProjectComponent} from './project/project.component';
import {LoginComponent} from './login/login.component';
import { ProjectPictureComponent } from './project/project-picture/project-picture.component';

const AppRoutes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 첫 화면을 login 페이지로 설정  
  { path: 'main', component: MainComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'activity', component: AcitivityComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'project/:id', component: ProjectComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'project_picture/:career_id/:project_id', component: ProjectPictureComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'login', component: LoginComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // 잘못된 URL을 사용했을때 Login 페이지로 돌려보냄.
];

export const AppRouterModule = RouterModule.forRoot(AppRoutes, {useHash: true});