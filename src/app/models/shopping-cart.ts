import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap) {
    this.itemsMap = itemsMap? itemsMap.items: {};
    Object.keys(this.itemsMap).forEach((key) => {
      let item = this.itemsMap[key];
      this.items.push(new ShoppingCartItem({...item,key:key}));
    });
  }

  getQuantity(key) {
    let item = this.itemsMap[key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    Object.keys(this.itemsMap).forEach((key) => {
      count += this.itemsMap[key].quantity;
    });
    return count;
  }

  get totalPrice() {
    let sum = 0;
    Object.keys(this.itemsMap).forEach((key) => {
      sum += this.itemsMap[key].price * this.itemsMap[key].quantity;
    });
    return sum;
  }
}
