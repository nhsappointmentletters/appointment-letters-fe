import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, NavigationExtras, Router, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class SignInRouterService {

  constructor(private router: Router) { }

  navigateToSignIn(routerState? : RouterStateSnapshot) {
    let navigationExtras: NavigationExtras = {};

    if(routerState){
      navigationExtras.queryParams = {returnUrl: routerState.url};
    }
    this.router.navigate(['login'],navigationExtras);
  }

  navigateToReturnUrl(route: ActivatedRouteSnapshot) {
    this.router.navigateByUrl(route.queryParams['returnUrl'] || '/');
  }

}
