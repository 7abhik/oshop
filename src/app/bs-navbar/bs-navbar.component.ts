import { Observable } from 'rxjs';
import { ShoppingCartService } from "./../services/shopping-cart.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/app-user";
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$:Observable<ShoppingCart>;
  constructor(
    private auth: AuthService,
    private ShoppingCartService: ShoppingCartService
  ) {}
  logout() {
    this.auth.logout();
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.ShoppingCartService.getCart();
  }
}
