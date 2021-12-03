import { OrderService } from "./../services/order.service";
import { Subscription } from "rxjs";
import { ShoppingCartService } from "./../services/shopping-cart.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"],
})
export class ShippingFormComponent{

}
