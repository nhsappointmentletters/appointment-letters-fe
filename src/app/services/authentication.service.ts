import {Injectable} from "@angular/core";
import {CacheService} from "../services/cache.service";

@Injectable()
export class AuthenticationService {

  constructor(private cacheService: CacheService) { }

  isSignedIn(): boolean {
    return this.cacheService.getUser() !== null;
  }

  getUser() {
    return this.cacheService.getUser();
  }

  logout(){
    this.cacheService.clear();
  }
}

