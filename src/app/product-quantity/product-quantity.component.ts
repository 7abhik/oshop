import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input("product") product:Product;
  @Input("shopping-cart") shoppingCart:ShoppingCart;
  constructor(private CartService: ShoppingCartService) {}
  addToCart() {
    this.CartService.addToCart(this.product);
  }
  removeFromCart(){
    this.CartService.removeFromCart(this.product)
  } 
 
}
