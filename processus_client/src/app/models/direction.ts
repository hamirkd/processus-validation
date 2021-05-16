export class Direction{
    id:number;  
    nom:string;
    updatedAt:any;
    createdAt:any;
    constructor(direction){
        this.id=direction.id;
        this.nom=direction.nom;
        this.updatedAt=direction.updatedAt;
        this.createdAt=direction.createdAt;
    }

}