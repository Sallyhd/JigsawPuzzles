import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from '../authenticate.service';
import { User } from '../models/user.model';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  get Username(){return environment.Username;}
  get Password(){return environment.Password;}
  get Welcome(){return environment.Welcome;}
  get Login(){return environment.Login;}
  get Logout(){return environment.Logout;}
  get UsernamePlcholder(){return environment.UsernamePlcholder;}
  get PassPlcholder(){return environment.PassPlcholder;}

  @ViewChild("loginForm")
  loginForm!:NgForm;

  #user:User=new User("","","");

  get user(){return this.#user;}
  successMessage:string="";
  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  get name() {
    return this._authService.name;
  }
  constructor(private _userService:UsersDataService, private _router:Router,private _authService:AuthenticateService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm:NgForm){
    this._userService.login(loginForm.value).subscribe({
     next:(token) =>{
       console.log("loginResult",token);
       this.hasFail=false;
       //this.hasSuccess=true;
       //this.successMessage=token;
       this._login(token);
     },
      error:(err) =>{
        console.log("err",err);
        //this.hasSuccess=false;
        this.hasFail=true;
        if(err.error){
          this.failMessage=err.error;
        }
        else{
          this.failMessage=err.message;
        }
        
      },
      complete:()=> {
        if(this.hasFail){
        loginForm.setValue({username:"",password:""});
        }
        else{
          this._router.navigate(['/']);
        }
      },
    });
  }

  
  private _login(token:string):void{
    this._authService.login(token)
    this._router.navigate([""]);
  }

  logout():void{
    this._authService.logout();
    this.loginForm.setValue({username:"",password:""});
    this._router.navigate(["/"]);
  }

}
