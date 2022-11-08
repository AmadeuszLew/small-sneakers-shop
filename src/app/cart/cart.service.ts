import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService{
    //inital value for dev {sku: "555088-711", model: "Jordan 1", name:"Taxi", brand: "Jordan", colorway:"TAXI/BLACK-SAIL", price:999,imagePath:"assets/img/list_items/jordan_1_taxi.jpeg", size: 43}
    cartSnekaersList:Product[]=[]
    public productList= new BehaviorSubject<Product[]>([]);
    constructor(){}
    
    getCartSneakers(){
        return this.cartSnekaersList.slice()
    }

    addToCart(product:Product){
        this.cartSnekaersList.push(product);
        this.productList.next(this.cartSnekaersList);
    }
    clearCart(){
        this.cartSnekaersList=[]
        this.productList.next(this.cartSnekaersList)
    }
    removeCartItem(product:Product){
        this.cartSnekaersList.map((a:Product,index:number)=>{
        if(product.sku === a.sku)
            this.cartSnekaersList.splice(index,1)
        })
        this.productList.next(this.cartSnekaersList)
    }
    getTotal(){
        let cartTotal=0;
        this.cartSnekaersList.map((x:Product)=>{
            cartTotal+=x.price;
        })
        return cartTotal
    }
}