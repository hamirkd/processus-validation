import { FuseUtils } from '@fuse/utils';
import { Direction } from 'app/models/direction';
import { User } from 'app/models/user';

export class Departement
{
    id: number;
    nom: string; 
    direction: Direction;
    manager : User ;
    createdAt: Date;
   

    /**
     * Constructor
     *
     * @param departement
     */
    constructor(departement)
    {
        this.id = departement.id||FuseUtils.generateGUID();
        this.nom = departement.nom;
        this.direction= departement.direction;
        this.manager= departement.manager;
        this.createdAt = departement.createdAt;
    
       
    }
}
