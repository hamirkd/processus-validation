import { FuseUtils } from "@fuse/utils";
import { Departement } from "./departement";
import { Direction } from "./direction";

export class User{
    id:number;
    matricule:string;    
    nom:string;
    prenom:string;
    email:string;
    password:string;
    directeur:User;
    manager:User;
    administrateur: User;
    direction:Direction;
    departement_nom:Departement;
    poste:'DIRECTEUR'|'EMPLOYE'|'MANAGER'|'ADMINISTRATEUR';
    updatedAt:Date;
    createdAt:Date;
    direction_id?;
    departement_id?;
    directeur_id?;
    manager_id?;
    
    constructor(user)
    {
        this.id = user.id||FuseUtils.generateGUID();
        this.matricule = user.matricule;
        this.nom = user.nom;
        this.prenom = user.prenom;
        this.email = user.email;
        this.password = user.password;
        this.directeur = user.directeur;
        this.manager = user.manager;
        this.direction = user.direction;
        // this.departement_nom=user.departement;
        this.poste = user.poste;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}