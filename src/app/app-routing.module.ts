import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component'
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'authorization', component:AuthorizationComponent},
  {path:'user',component:UserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
