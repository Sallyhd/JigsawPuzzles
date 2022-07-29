import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';
import { Puzzle } from './models/Puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesDataService {

  _baseUrl:string="http://localhost:3000/api";
  _puzzlesUrl:string="http://localhost:3000/api/puzzles";
  constructor(private _http:HttpClient,private _authService:AuthenticateService) { }

  getPuzzles(offset:number,count:number):Observable<Puzzle[]>{
    const url=this._puzzlesUrl+"?count="+count+"&offset="+offset;
    return this._http.get<Puzzle[]>(url);
  }
  getPuzzle(puzzleId:string):Observable<Puzzle>{
    const url = this._puzzlesUrl+"/"+puzzleId;
    return this._http.get<Puzzle>(url);
  }
  addPuzzle(puzzle:Puzzle):Observable<Puzzle>{
    return this._http.post<Puzzle>(this._puzzlesUrl,puzzle,{headers:{"authorization":"Bearer "+this._authService.token}});
  }
  deletePuzzle(puzzleId:string):Observable<Puzzle>{
    const url = this._puzzlesUrl+"/"+puzzleId;
    return this._http.delete<Puzzle>(url);
  }
  updateFullPuzzle(puzzleId:string,puzzle:Puzzle):Observable<Puzzle>{
    const url = this._puzzlesUrl+"/"+puzzleId;
    return this._http.put<Puzzle>(url,puzzle);
  }
  updatePartialPuzzle(puzzleId:string,puzzle:Puzzle):Observable<Puzzle>{
    const url = this._puzzlesUrl+"/"+puzzleId;
    return this._http.patch<Puzzle>(url,puzzle);
  }
  searchPuzzle(puzzleName:string):Observable<Puzzle[]>{
    const url = this._puzzlesUrl+"?search="+puzzleName;
    return this._http.get<Puzzle[]>(url);
  }

}
