import { FuseUtils } from '@fuse/utils';
import {Direction} from '../../../models/direction';
import { Departement } from '../departements/departement.model';


export class TypeDemande {
    id: number;
    nom: string;
    createdAt: Date;
    workFlowDirection: Direction;
    workFlowDepartement :  Departement;
    // departement : Departement;



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
        this.createdAt = typeDemande.createdAt;
        
    }
}
