import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DataComponent } from './shared/data/data.component';
import { UserComponent } from './user/user.component';
import { AlertsService } from './shared/alerts.service';
import { SneakersComponent } from './sneakers/sneakers.component';
import { SneakerDetailComponent } from './sneakers/sneaker-detail/sneaker-detail.component';
import { SneakserService } from './sneakers/sneakers.service';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { SumUpComponent } from './cart/sum-up/sum-up.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorizationComponent,
    LoadingSpinnerComponent,
    DataComponent,
    UserComponent,
    SneakersComponent,
    SneakerDetailComponent,
    CartComponent,
    CartItemComponent,
    SumUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AlertsService, SneakserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
