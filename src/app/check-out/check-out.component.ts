import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  cart: ShoppingCart;
  shipping = {};
  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  placeOrder(shipping) {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: shipping,
      items: this.cart.items.map((i) => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        };
      }),
    };
    this.orderService.storeOrder(order);
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe((cart) => (this.cart = cart));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
