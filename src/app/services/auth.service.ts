import { UserService } from "./user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable, empty } from "rxjs";
import { AppUser } from "../models/app-user";
import { switchMap } from "rxjs/operators";
import { EMPTY } from 'rxjs'

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login')
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user: firebase.User) => {
        if (user) return this.userService.get(user.uid);
        return EMPTY;
      })
    );
  }
}
