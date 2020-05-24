import { Observable } from 'rxjs';
import { AppUser } from './../models/app-user';
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import * as firebase from "firebase/app";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}
  save(user: firebase.User) {
    this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  get(uid: string):Observable<AppUser> {
    this.db.object<AppUser>("/users/" + uid).valueChanges().subscribe(x=>console.log(x));
    return this.db.object<AppUser>("/users/" + uid).valueChanges();
  }
}
