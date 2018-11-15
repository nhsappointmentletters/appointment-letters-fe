import {Injectable} from "@angular/core";

@Injectable()
export class CacheService {
  private static TOKEN_KEY = "authenticationToken";

  constructor() { }

  clear() {
    sessionStorage.clear();
  }

  setToken(token, id, username){
    let user = {
      authenticationToken:token,
      id:id,
      username:username
    }
    sessionStorage.setItem(CacheService.TOKEN_KEY, JSON.stringify(user));
  }

  getToken(){
    let jsonString = sessionStorage.getItem(CacheService.TOKEN_KEY);
    let user = JSON.parse(jsonString);
    return user.authenticationToken;
  }
  getUser(){
    let jsonString = sessionStorage.getItem(CacheService.TOKEN_KEY);
    let user = JSON.parse(jsonString);
    if(user) {
      return user;
    }
    else {
      return null;
    }
  }

}
