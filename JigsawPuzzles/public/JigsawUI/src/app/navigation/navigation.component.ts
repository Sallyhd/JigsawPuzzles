import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  get puzzlesTitle(){return environment.Puzzles;}
  get AddPuzzle(){return environment.AddPuzzle;}
  get SearchPuzzle(){return environment.SearchPuzzle;}
  get Register(){return environment.Register;}
  get Login(){return environment.Login;}

  get isLoggedIn(){return this._authService.isLoggedIn;}

  loginClick:boolean=true;
  registerClick:boolean=false;
  constructor(private _router:Router,private _authService:AuthenticateService) { }

  ngOnInit(): void {
    this._router.navigate([""]);
    
  }

  registerClicked(){
    this.registerClick=true;
    this.loginClick =false;
  }

  loginClicked(){
    this.registerClick=false;
    this.loginClick =true;
  }

}
