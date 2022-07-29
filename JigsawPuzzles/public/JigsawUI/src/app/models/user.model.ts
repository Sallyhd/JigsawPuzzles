export class User {
    #_id!:string;
    #name!:string;
    #username!:string;
    #password!:string;

    constructor(name:string,username:string,password:string){
        this.#name=name;
        this.#password=password;
        this.#username=username;
      }

    get _id(){return this.#_id;}
    get name(){return this.#name;}
    get username(){return this.#username;}
    get password(){return this.#password;}
    set name(name:string){this.#name=name;}
    set username(username:string){this.#username=username;}
    set password(password:string){this.#password=password;}
}