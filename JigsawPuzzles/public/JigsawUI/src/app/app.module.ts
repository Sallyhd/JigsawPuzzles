import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService,JWT_OPTIONS } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { StoresComponent } from './stores/stores.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddPuzzleComponent } from './add-puzzle/add-puzzle.component';
import { EditPuzzleComponent } from './edit-puzzle/edit-puzzle.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { SearchComponent } from './search/search.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PuzzlesComponent,
    PuzzleComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    StoresComponent,
    RegisterComponent,
    LoginComponent,
    AddPuzzleComponent,
    EditPuzzleComponent,
    AddStoreComponent,
    EditStoreComponent,
    SearchComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"puzzles",
        component:PuzzlesComponent,
        children:[
          
        ]
      },
      {
        path:"puzzle/:puzzleId",
        component:PuzzleComponent,
        children:[
          {
            path:"stores",
            component:StoresComponent
          },
          {
            path:"addStore",
            component:AddStoreComponent
          },
          {
            path:"editStore/:storeId",
            component:EditStoreComponent
          }
        ]
      },
      {
        path:"register",
        component:RegisterComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"addPuzzle",
        component:AddPuzzleComponent
      },
      {
        path:"editPuzzle/:puzzleId",
        component:EditPuzzleComponent
      },
      {
        path:"search",
        component:SearchComponent
      },
      {
        path: "**",
        component: ErrorPageComponent
      }
    ])
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
