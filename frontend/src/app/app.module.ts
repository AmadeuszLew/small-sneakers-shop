import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizationComponent } from './authorization/authorization.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { DataComponent } from './shared/data/data.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { SumUpComponent } from './cart/sum-up/sum-up.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { OrderHistoryComponent } from './order/order-history/order-history.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

//When working on any component in angular, rewrite it to standalone format please. Trying to migrate app to use standalone components
@NgModule({
  declarations: [
    AuthorizationComponent,
    LoadingSpinnerComponent,
    DataComponent,
    CartComponent,
    CartItemComponent,
    SumUpComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ]
  // Remove bootstrap array
})
export class AppModule { }
