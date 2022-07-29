import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from './models/Store.model';

@Injectable({
  providedIn: 'root'
})
export class StoresDataService {

  _baseUrl:string="http://localhost:3000/api/puzzles/";
  constructor(private _http:HttpClient) {
    
   }

  getStores(puzzleId:string):Observable<Store[]>{
    const url =this._baseUrl+puzzleId+"/stores";
    return this._http.get<Store[]>(url);
  }
  getStore(puzzleId:string,storeId:string):Observable<Store>{
    const url =this._baseUrl+puzzleId+"/stores/"+storeId;
    return this._http.get<Store>(url);
  }
  addStore(puzzleId:string,store:Store):Observable<Store>{
    const url =this._baseUrl+puzzleId+"/stores";
    return this._http.post<Store>(url,store);
  }
  deletePuzzle(puzzleId:string,storeId:string):Observable<Store>{
    const url =this._baseUrl+puzzleId+"/stores/"+storeId;
    return this._http.delete<Store>(url);
  }
  updateFullPuzzle(puzzleId:string,storeId:string,store:Store):Observable<Store>{
    const url =this._baseUrl+puzzleId+"/stores/"+storeId;
    return this._http.put<Store>(url,store);
  }
  updatePartialPuzzle(puzzleId:string,storeId:string,store:Store):Observable<Store>{
    const url =this._baseUrl+puzzleId+"/stores/"+storeId;
    return this._http.patch<Store>(url,store);
  }
}
