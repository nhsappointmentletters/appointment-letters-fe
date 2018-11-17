import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {SignInRouterService} from "../services/sign-in-router.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private signInRouterService: SignInRouterService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isSignedIn()) {
      return true;
    } else {
      this.signInRouterService.navigateToSignIn(state);
      return false;
    }
  }
}
