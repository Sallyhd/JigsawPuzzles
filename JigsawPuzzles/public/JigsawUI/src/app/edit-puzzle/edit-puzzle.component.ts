import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Puzzle } from '../models/Puzzle.model';
import { PuzzlesDataService } from '../puzzles-data.service';

@Component({
  selector: 'app-edit-puzzle',
  templateUrl: './edit-puzzle.component.html',
  styleUrls: ['./edit-puzzle.component.css']
})
export class EditPuzzleComponent implements OnInit {
  
  get Name(){return environment.Name;}
  get EditPuzzle(){return environment.EditPuzzle;}
  get NumPieces(){return environment.NumPieces;}
  get PuzzleName(){return environment.PuzzleName;}

  @ViewChild("editPuzzleForm")
  editPuzzleForm!:NgForm;

  puzzle:Puzzle=new Puzzle("",0,[]);

  successMessage:string="";
  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;

  puzzleId:string= "";
  constructor(private _puzzleService:PuzzlesDataService,private _router:Router,private _activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.puzzleId= this._activatedRouter.snapshot.params["puzzleId"];
    this._puzzleService.getPuzzle(this.puzzleId).subscribe((puzzle)=>{
      this.puzzle=puzzle;
    })
  }

  onEdit(editPuzzleForm:NgForm){
    this._puzzleService.updatePartialPuzzle(this.puzzleId,editPuzzleForm.value).subscribe({
     next:(updateResult) =>{
       console.log("Result",updateResult);
       this.hasFail=false;
       this.hasSuccess=true;
       this.successMessage="success";
     },
      error:(err) =>{
        console.log("err",err);
        this.hasSuccess=false;
        this.hasFail=true;
        this.failMessage=err.error;
      },
      complete:()=> {
        if(this.hasFail){
          editPuzzleForm.setValue({name:"",numPieces:0});
        }
        else{
          this._router.navigate(['puzzles']);
        }
      },
    });
  }
}
