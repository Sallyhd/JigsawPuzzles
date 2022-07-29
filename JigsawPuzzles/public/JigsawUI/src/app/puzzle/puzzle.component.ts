import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';
import { Puzzle } from '../models/Puzzle.model';
import { PuzzlesDataService } from '../puzzles-data.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  get NumPieces(){return environment.NumPieces;}
  get Stores(){return environment.Stores;}
  get AddStore(){return environment.AddStore;}

  get isLoggedIn(){return this._authService.isLoggedIn;}
  puzzle:Puzzle= new Puzzle("",0,[]);
  constructor(private _puzzleService:PuzzlesDataService,private _activatedRouter:ActivatedRoute,
    private _authService:AuthenticateService) { }

  ngOnInit(): void {
    console.log("router",this._activatedRouter.snapshot.url);
    
    this.loadPuzzle();
  }

  loadPuzzle(){
    const puzzleId= this._activatedRouter.snapshot.params["puzzleId"];
    this._puzzleService.getPuzzle(puzzleId).subscribe((puzzle)=>{
      this.puzzle=puzzle;
    });
  }

}
