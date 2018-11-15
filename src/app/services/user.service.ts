import {Injectable} from "@angular/core";
import {CacheService} from "../services/cache.service";

@Injectable()
export class UserService {

  constructor(private cacheService: CacheService) { }

  isSignedIn(): boolean {
    return this.cacheService.getUser() !== null;
  }

  getUser() {
    return this.cacheService.getUser();
  }

  logout(){
    console.log('calling logout');
    this.cacheService.clear();
  }
}

