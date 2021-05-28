import {FuseUtils} from '@fuse/utils';
import {Direction} from 'app/models/direction';
import {User} from 'app/models/user';
import {Departement} from '../departements/departement.model';
import {TypeDemande} from '../typeDemandes/typeDemande.model';
import {RequestState} from '../../../models/request-state';

export class Demande
{
    id: number;
    demandeur: User;
    direction: Direction;
    manager: User;
    directeur: User;
    administrateur: User;
    departement: Departement;
    typeDemande: TypeDemande;
    etatdirecteur: 'ENCOURS'|'ACCEPTER'|'REJETER';
    etat: 'ENCOURS'|'ACCEPTER'|'REJETER';
    etatmanager: 'ENCOURS'|'ACCEPTER'|'REJETER';
    description: string;
    createdAt: Date;
    direction_id?;
    state: RequestState = RequestState.INITIAL;
    workFlowDirection: Direction;
  

    /**
     * 
     * Constructor
     *
     * @param demande
     */
    constructor(demande)
    {
        this.id = demande.id || FuseUtils.generateGUID();
        this.demandeur = demande.demandeur;
        this.direction = demande.direction;
        this.description = demande.description;
        this.directeur = demande.directeur;
        this.administrateur = demande.adminstrateur;
        this.manager = demande.manager;
        this.typeDemande = demande.typeDemande;
        this.etatdirecteur = demande.etatdirecteur;
        this.etatmanager = demande.etatmanager;
        this.etat = demande.etat;
        this.createdAt = demande.createdAt;
       
    }
}
