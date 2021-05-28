import { FuseUtils } from '@fuse/utils';
import {Direction} from '../../../models/direction';

export class TypeDemande {
    id: number;
    nom: string;
    createdAt: Date;
    workFlowDirection: Direction;



    /**
     * Constructor
     *
     * @param typeDemande
     */
    constructor(typeDemande) {
        this.id = typeDemande.id || FuseUtils.generateGUID();
        this.nom = typeDemande.nom;
        this.workFlowDirection = typeDemande.workFlowDirection;
        this.createdAt = typeDemande.createdAt;


    }
}
