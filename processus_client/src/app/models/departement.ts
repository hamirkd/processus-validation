export class Departement{
    id:number;  
    nom:string;
    updatedAt:any;
    createdAt:any;
    constructor(departement)
    {
        this.id=departement.id;
        this.nom=departement.nom;
        this.updatedAt=departement.updatedAt;
        this.createdAt=departement.createdAt;
    }

}