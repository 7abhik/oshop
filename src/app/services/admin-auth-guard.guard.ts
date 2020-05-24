import { UserService } from "./user.service";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {
  user: any;
  constructor(private auth: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser) => appUser.isAdmin));
  }
}
