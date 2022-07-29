import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  #isLoggedIn:boolean=false;
    get isLoggedIn(){
      if(localStorage.getItem("token")){
        return true;
      }
      else{
        return false;
      }
    }
    //set isLoggedIn(isLoggedIn:boolean){this.#isLoggedIn=isLoggedIn;} 
    set token(token:string){localStorage.setItem("token",token);}
    get token(){return localStorage.getItem("token") as string;}
    get name(){
      if(this._jwtService.decodeToken(this.token)){
        return this._jwtService.decodeToken(this.token).name;
      }
      else{
        return "Sally";
      }
    }

    logout(){
     localStorage.clear();
     
    }

    login(token:string){
      this.token=token;
      
    }
  constructor(private _jwtService: JwtHelperService) { }
}
