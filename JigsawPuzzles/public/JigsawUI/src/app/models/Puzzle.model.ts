import { Store } from "./Store.model";

export class Puzzle{
    #_id!:string;
    #name!:string;
    #numPieces!:number;
    #stores!:Store[];
  
    constructor(name:string,numPieces:number,stores:Store[]){
      this.#name=name;
      this.#numPieces=numPieces;
      this.#stores=stores;
    }
  
    get _id(){return this.#_id;}
    get name(){return this.#name;}
    get numPieces(){return this.#numPieces;}
    get stores(){return this.#stores;}
    
    set name(name:string){this.#name=name;}
    set numPieces(numPieces:number){this.#numPieces=numPieces;}
    set stores(stores:Store[]){this.#stores=stores;}
  }