import { ShoppingCart } from './../../models/shopping-cart';
import { Product } from './../../models/product';
import { ShoppingCartService } from "./../../services/shopping-cart.service";
import { Component, Input } from "@angular/core";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input("product") product:Product;
  @Input("cartButton") cartButton = true;
  @Input("shopping-cart") shoppingCart:ShoppingCart;
  constructor(private CartService: ShoppingCartService) {}
  addToCart() {
    this.CartService.addToCart(this.product);
  }
}
