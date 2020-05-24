import { ShoppingCart } from "./../models/shopping-cart";
import { Observable } from "rxjs";
import { Product } from "./../models/product";
import { AngularFireDatabase } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(map((x) => new ShoppingCart(x)));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private createCartId() {
    return this.db.list("/shopping-carts").push({
      createDate: new Date().getTime(),
    });
  }

  private getItem(cartId, productId) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId: string = localStorage.getItem("cartId");
    if (cartId) return cartId;
    let result = await this.createCartId();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }
  private async updateItem(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let quantity = (item ? item["quantity"] : 0) + change;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            quantity: quantity,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
          });
      });
  }
}
