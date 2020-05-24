import { ShoppingCart } from "./../../models/shopping-cart";
import { ShoppingCartService } from "./../../services/shopping-cart.service";
import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: ShoppingCart;
  subscription: Subscription;
  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}
  private populateProduct() {
    this.ProductService.getAll()
      .pipe(
        switchMap((p) => {
          Object.keys(p).forEach((key) => {
            p[key].key = key;
            this.products.push(p[key]);
          });
          return this.route.queryParams;
        })
      )
      .subscribe((query) => {
        this.category = query.category;
        this.applyFilter();
      });
  }
  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((products) => products.category == this.category)
      : this.products;
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
    this.populateProduct();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
