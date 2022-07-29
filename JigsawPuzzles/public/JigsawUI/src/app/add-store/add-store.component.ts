import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Puzzle } from '../models/Puzzle.model';
import { Store } from '../models/Store.model';
import { StoresDataService } from '../stores-data.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {

  get AddStore(){return environment.AddStore;}
  get URL(){return environment.URL;}
  get PuzzlePrice(){return environment.PuzzlePrice;}
  get Add(){return environment.Add;}
  get StorePlcholder(){return environment.StorePlcholder;}

  @ViewChild("addStoreForm")
  addStoreForm!:NgForm;

  store:Store=new Store("",0);

  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;

  puzzleId:string="";
  constructor(private _storeService:StoresDataService,private _router:Router,private _activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd(addStoreForm:NgForm){
    this._activatedRouter.parent!.params.subscribe(params =>{ this.puzzleId=params["puzzleId"];console.log("parms",params);
    });
    
    this._storeService.addStore(this.puzzleId, addStoreForm.value).subscribe({
     next:(addResult) =>{
       console.log("Result",addResult);
       this.hasFail=false;
       this.hasSuccess=true;
     },
      error:(err) =>{
        console.log("err",err);
        this.hasSuccess=false;
        this.hasFail=true;
        this.failMessage=err.error;
      },
      complete:()=> {
        if(this.hasFail){
          addStoreForm.setValue({url:"",puzzlePrice:0});
        }
        else{
          this._router.navigate(['puzzle/'+this.puzzleId]);
        }
      },
    });
  }
}
