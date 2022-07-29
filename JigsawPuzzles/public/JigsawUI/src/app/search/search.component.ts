import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../models/Puzzle.model';
import { PuzzlesDataService } from '../puzzles-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  name:string="";
  puzzles:Puzzle[]=[];
  constructor(private _puzzleService:PuzzlesDataService) { }

  ngOnInit(): void {
  }
  search(): void {
    this._puzzleService.searchPuzzle(this.name).subscribe((puzzles) =>{console.log("search puzzles",puzzles);
     this.puzzles = puzzles});
  }

}
