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
import { SneakersService } from './sneakers/sneakers.service';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { SumUpComponent } from './cart/sum-up/sum-up.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { AddressManagementComponent } from './user/Addresses/address-management/address-management.component';
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
    SumUpComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AddressManagementComponent
  ],
  providers: [AlertsService, SneakersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
