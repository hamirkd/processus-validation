import { FuseUtils } from '@fuse/utils';
import { User } from 'app/models/user';
import {Direction} from '../../../models/direction';
import { Departement } from '../departements/departement.model';


export class TypeDemande {
    id: number;
    nom: string;
    createdAt: Date;
    workFlowDirection: Direction;
    user : User;
    direction: Direction;
    workFlowDepartement :  Departement;
    workFlowDirection2: Direction;
   



    /**
     * Constructor
     *
     * @param typeDemande
     */
    constructor(typeDemande) {
        this.id = typeDemande.id || FuseUtils.generateGUID();
        this.nom = typeDemande.nom;
        this.workFlowDirection = typeDemande.workFlowDirection;
        this.workFlowDepartement = typeDemande.workFlowDepartement;
        this.user = typeDemande.user;
        this.workFlowDirection2 = typeDemande.workFlowDirection2;
        this.createdAt = typeDemande.createdAt;
        
    }
}
