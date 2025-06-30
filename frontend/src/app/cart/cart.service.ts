import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';
import { OrderService, CreateOrderRequest, OrderItem } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    // inital value for dev {sku: "555088-711", model: "Jordan 1", name:"Taxi", brand: "Jordan", colorway:"TAXI/BLACK-SAIL", price:999,imagePath:"assets/img/list_items/jordan_1_taxi.jpeg", size: 43}
    cartSneakersList: Product[] = [];
    public productList = new BehaviorSubject<Product[]>([]);
    
    constructor(private orderService: OrderService) {}

    getCartSneakers() {
        return this.cartSneakersList.slice();
    }

    addToCart(product: Product) {
        this.cartSneakersList.push(product);
        this.productList.next(this.cartSneakersList);
    }
    
    clearCart() {
        this.cartSneakersList = [];
        this.productList.next(this.cartSneakersList);
    }
    
    removeCartItem(product: Product) {
        this.cartSneakersList.map((a: Product, index: number) => {
        if (product.sku === a.sku) {
            this.cartSneakersList.splice(index, 1);
        }
        });
        this.productList.next(this.cartSneakersList);
    }
    
    getTotal() {
        let cartTotal = 0;
        this.cartSneakersList.map((x: Product) => {
            cartTotal += x.price;
        });
        return cartTotal;
    }

    getTotalWithShipping() {
        return this.getTotal() + 15; // 15 PLN shipping
    }

    createOrderFromCart(shippingAddress: string, customerName: string): Observable<any> {
        const orderItems: OrderItem[] = this.cartSneakersList.map(product => ({
            sneakerSku: product.sku,
            size: product.size,
            quantity: 1, // Assuming 1 quantity per cart item for now
            price: product.price
        }));

        const orderRequest: CreateOrderRequest = {
            items: orderItems,
            shippingAddress: shippingAddress,
            customerName: customerName
        };

        return this.orderService.createOrder(orderRequest);
    }

    getCartItemCount(): number {
        return this.cartSneakersList.length;
    }
}
