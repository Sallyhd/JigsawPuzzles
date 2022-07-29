import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../models/Store.model';
import { StoresDataService } from '../stores-data.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  @ViewChild("addStoreForm")
  addStoreForm!:NgForm;

  store:Store=new Store("",0);

  successMessage:string="";
  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;

  puzzleId:string="";
  storeId:string="";
  constructor(private _storeService:StoresDataService,private _router:Router,private _activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRouter.parent!.params.subscribe(params =>{ 
      this.puzzleId=params["puzzleId"];
    });
    this.storeId=this._activatedRouter.snapshot.params['storeId'];
    this._storeService.getStore(this.puzzleId,this.storeId).subscribe((store)=>{
      this.store=store;
    });
  }

  onEdit(editStoreForm:NgForm){
    this._storeService.updateFullPuzzle(this.puzzleId,this.storeId, editStoreForm.value).subscribe({
     next:(editResult) =>{
       console.log("Result",editResult);
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
          editStoreForm.setValue({url:"",puzzlePrice:0});
        }
        else{
          this._router.navigate(['puzzle/'+this.puzzleId+'/stores']);
        }
      },
    });
  }

}
