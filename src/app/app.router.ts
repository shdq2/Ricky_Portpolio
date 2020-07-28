import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {AboutComponent} from './about/about.component';
import {ProjectComponent} from './project/project.component';

const AppRoutes: Routes = [  
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // 첫 화면을 login 페이지로 설정  
  { path: 'main', component: MainComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'about', component: AboutComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: 'project', component: ProjectComponent, }, // url 경로가 /main 일때 MainComponent를 보여준다.
  { path: '**', redirectTo: '/main', pathMatch: 'full' }, // 잘못된 URL을 사용했을때 Login 페이지로 돌려보냄.
];

export const AppRouterModule = RouterModule.forRoot(AppRoutes, {useHash: true});