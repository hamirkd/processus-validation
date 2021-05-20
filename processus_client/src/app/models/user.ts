import { FuseUtils } from "@fuse/utils";
import { Direction } from "./direction";

export class User{
    id:number;
    // id:string;    
    nom:string;
    prenom:string;
    email:string;
    password:string;
    directeur:User;
    manager:User;
    administrateur: User;
    direction:Direction;
    poste:'DIRECTEUR'|'EMPLOYE'|'MANAGER'|'ADMINISTRATEUR';
    updatedAt:Date;
    createdAt:Date;
    direction_id?;
    directeur_id?;
    manager_id?;   
    
    constructor(user)
    {
        this.id = user.id||FuseUtils.generateGUID();
        this.nom = user.nom;
        this.prenom = user.prenom;
        this.email = user.email;
        this.password = user.password;
        this.directeur = user.directeur;
        this.manager = user.manager;
        this.direction = user.direction;
        this.poste = user.poste;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}