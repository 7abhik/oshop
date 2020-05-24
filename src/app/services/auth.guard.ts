import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: Observable<firebase.User>
  constructor(private auth: AuthService, private router: Router) { }
  /*  canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return false;
     }
  */

  canActivate(route,state:RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
    }));
  }

}
