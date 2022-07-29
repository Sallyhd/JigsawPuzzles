export class Store{
    #_id!:string;
    #url!:string;
    #puzzlePrice!:number;
  
    constructor(url:string,puzzlePrice:number){
      this.#url=url;
      this.#puzzlePrice=puzzlePrice;
    }
    get _id(){return this.#_id;}
    get url(){return this.#url;}
    get puzzlePrice(){return this.#puzzlePrice;}

    
    set url(url:string){this.#url=url;}
    set puzzlePrice(price:number){this.#puzzlePrice=price;}
  }