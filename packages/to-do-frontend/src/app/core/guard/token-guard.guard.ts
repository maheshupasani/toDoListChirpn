import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { ACCESS_TOKEN } from "../constants/app-strings";

@Injectable({
  providedIn: "root",
})
export class TokenGuardGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
