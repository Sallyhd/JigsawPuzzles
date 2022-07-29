import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';
import { Puzzle } from '../models/Puzzle.model';
import { PuzzlesDataService } from '../puzzles-data.service';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {

  get Edit(){return environment.Edit;}
  get Delete(){return environment.Delete;}
  get Previous(){return environment.Previous;}
  get Next(){return environment.Next;}

  get isLoggedIn(){return this._authService.isLoggedIn;}
  puzzles:Puzzle[]=[];
  offset: number= 0;
  #count: number= 10;
  set count(count: string) {this.#count= parseInt(count, 10);console.log("setter", count, this.#count);
  }
  get count():string {return this.#count+"";}
  isOffsetZero: boolean= true;
  isOffsetMax: boolean= false;
  constructor(private _puzzleService:PuzzlesDataService,private _router:Router,private _authService:AuthenticateService) { }

  ngOnInit(): void {
    this.loadPuzzles();
  }

  loadPuzzles(){
    this._puzzleService.getPuzzles(this.offset,this.#count).subscribe((puzzles)=>{ this.puzzles=puzzles;});
  }

  delete(puzzleId:string){
    this._puzzleService.deletePuzzle(puzzleId).subscribe({
      next:(puzzle)=>{
        
      },
      error:(err)=>{

      },
      complete:()=>
      {
        this._router.navigate(['puzzles']);
      }
    });
  }
  
  previous(): void {
    if (this.offset > 0) {
      this.offset= this.offset - this.#count;
    }
    if (this.offset <= 0) {
      this.offset = 0;
      this.isOffsetZero= true;
      this.isOffsetMax= false;
    }
    this.ngOnInit();
  }

  next(): void {
    if (this.offset >= 2572) {
      this.offset = 2572;
      this.isOffsetZero= false;
      this.isOffsetMax= true;
    }
    else{
      this.offset = this.offset + this.#count;
    }
    this.isOffsetZero= false;
    this.ngOnInit();
  }

}
