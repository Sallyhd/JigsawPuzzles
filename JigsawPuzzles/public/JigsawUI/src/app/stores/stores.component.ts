import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { Store } from '../models/Store.model';
import { PuzzlesDataService } from '../puzzles-data.service';
import { StoresDataService } from '../stores-data.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  get isLoggedIn(){return this._authService.isLoggedIn;}
  stores:Store[]=[];
  puzzleId:any;
  sub:any;
  constructor(private _storeService:StoresDataService,private _router:Router,
    private _activatedRouter:ActivatedRoute, private _authService:AuthenticateService) {
    
  }

  ngOnInit(): void {
    console.log("router in stores",this._activatedRouter.snapshot.url);
    this._activatedRouter.parent!.params.subscribe(params => this.puzzleId=params['puzzleId']);
    this._storeService.getStores(this.puzzleId).subscribe((stores)=>{this.stores=stores;});
  }

  deleteStore(storeId:string):void{
    this._storeService.deletePuzzle(this.puzzleId,storeId).subscribe((deletedPuzzle)=>{
      this._router.navigate(['/puzzle/'+this.puzzleId+'/stores']);
    })
  }

}
