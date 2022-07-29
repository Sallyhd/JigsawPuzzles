import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  _baseUrl:string="http://localhost:3000/api/users";
  constructor(private _http:HttpClient) { }

  register(user:User):Observable<User>{
    console.log("user",user);
    return this._http.post<User>(this._baseUrl,user);
  }

  login(user:User):Observable<string>{
    const url = this._baseUrl +"/login";
    console.log("user",user);
    return this._http.post<string>(url,user);
  }
}
