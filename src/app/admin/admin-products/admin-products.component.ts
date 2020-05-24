import { ProductService } from "src/app/services/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((p) =>
      Object.keys(p).forEach((key) => {
        p[key].key = key;
        this.products.push(p[key]);
      })
    );
    this.filteredProducts = this.products;
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.payload.val().title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
}
