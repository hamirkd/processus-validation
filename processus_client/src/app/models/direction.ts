import { User } from "./user";

export class Direction {
    id: number;
    nom: string;
    directeur:User;
    updatedAt: any;

    
    createdAt: any;

    constructor(direction) {
        this.id = direction.id;
        this.nom = direction.nom;
        this.directeur = direction.directeur;
        this.updatedAt = direction.updatedAt;
        this.createdAt = direction.createdAt;
    }

}
