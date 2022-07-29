import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  get RegisterNewUser(){return environment.RegisterNewUser;}
  get Name(){return environment.Name;}
  get Username(){return environment.Username;}
  get Password(){return environment.Password;}
  get PassPlcholder(){return environment.PassPlcholder;}
  get UsernamePlcholder(){return environment.UsernamePlcholder;}

  successMessage:string="";
  failMessage:string="";
  hasSuccess:boolean=false;
  hasFail:boolean=false;
  #userRegisterationForm!:FormGroup;

  get userRegisterationForm(){return this.#userRegisterationForm;}
  get name() { return this.#userRegisterationForm.get('name'); }
  newUser:User = new User("","","");
  constructor(private _userService:UsersDataService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.#userRegisterationForm = new FormGroup({
      name: new FormControl(this.newUser.name,[Validators.required]),
      username:new FormControl(this.newUser.username),
      password:new FormControl(this.newUser.password),
      //repeatPass:new FormControl(""),
    })
    // this.#userRegisterationForm=this.formbuilder.group({
    //   name:"",
    //   username:"",
    //   password:"",
    //   repeatPass:"",
    // });
  }

  onRegister(){
    this._userService.register(this.#userRegisterationForm.value).subscribe({
      next:()=>{
        this.hasSuccess=true;
        this.hasFail=false;
        this.successMessage="registration successfull";
      },
      error:(error)=>{
        console.log("error",error);
        
        this.hasSuccess=false;
        this.hasFail=true;
        this.failMessage="Registration Failed";
      },
      complete:()=>{
        this.#userRegisterationForm.setValue({name:"",username:"",password:""});
      }
    });
  }

}
