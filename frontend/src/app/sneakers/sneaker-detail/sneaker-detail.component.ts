import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { Product } from '../../cart/product.model';
import { Sneaker } from '../sneaker.model';
import { SneakersService } from '../sneakers.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.css']
})
export class SneakerDetailComponent implements OnInit {
  sneaker: Sneaker;
  sizePicked = 0;  constructor(private route: ActivatedRoute,
              private sneakerService: SneakersService,
              private cartService: CartService) { }
  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.sneakerService.getSneakerObservable(id).subscribe({
      next: (sneaker) => {
        this.sneaker = sneaker;
        console.log(this.sneaker);
      },
      error: (error) => {
        console.error('Error loading sneaker:', error);
      }
    });
  }
  addToCart(product: Sneaker) {
    console.log(this.sizePicked);
    console.log(product);
    const addProduct = new Product(product.sku, product.model, product.name, product.brand, product.colorway, product.price, product.imagePath, this.sizePicked);
    this.cartService.addToCart(addProduct);
  }
}
