import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorizationComponent} from './authorization/authorization.component';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { CartComponent } from './cart/cart.component';
import { SneakerDetailComponent } from './sneakers/sneaker-detail/sneaker-detail.component';
import { SneakersComponent } from './sneakers/sneakers.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: SneakersComponent},
  {path: 'cart', component: CartComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'user', canActivate: [AuthorizationGuard], component: UserComponent},
  {path: ':id', component: SneakerDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
