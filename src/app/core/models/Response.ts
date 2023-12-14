export class Response <T> {
    message : string ;
    result : T ;
    errors : any ;

    //no args constructor
    constructor(message : string, result : T, errors : any){
        this.message = message;
        this.result = result;
        this.errors = errors;
    }
}
