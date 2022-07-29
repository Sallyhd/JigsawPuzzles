import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Puzzle } from '../models/Puzzle.model';
import { PuzzlesDataService } from '../puzzles-data.service';

@Component({
  selector: 'app-add-puzzle',
  templateUrl: './add-puzzle.component.html',
  styleUrls: ['./add-puzzle.component.css']
})
export class AddPuzzleComponent implements OnInit {

  get Name(){return environment.Name;}
  get AddPuzzle(){return environment.AddPuzzle;}
  get NumPieces(){return environment.NumPieces;}
  get PuzzleName(){return environment.PuzzleName;}

  @ViewChild("addPuzzleForm")
  addPuzzleForm!:NgForm;

  puzzle:Puzzle=new Puzzle("",0,[]);

  successMessage:string="";
  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;
  constructor(private _puzzleService:PuzzlesDataService,private _router:Router) { }

  ngOnInit(): void {
  }

  onAdd(addPuzzleForm:NgForm){
    this._puzzleService.addPuzzle(addPuzzleForm.value).subscribe({
     next:(addResult) =>{
       console.log("Result",addResult);
       this.hasFail=false;
       this.hasSuccess=true;
       this.successMessage="success";
     },
      error:(err) =>{
        console.log("err",err);
        this.hasSuccess=false;
        this.hasFail=true;
        if(err.error && err.error.message){
          this.failMessage=err.error.message;
        }
        else{
          this.failMessage=err.error;
        }
        
      },
      complete:()=> {
        if(this.hasFail){
          addPuzzleForm.setValue({username:"",password:""});
        }
        else{
          this._router.navigate(['puzzles']);
        }
      },
    });
  }

}
