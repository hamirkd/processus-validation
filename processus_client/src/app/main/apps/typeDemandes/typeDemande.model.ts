import { FuseUtils } from '@fuse/utils';

export class TypeDemande
{
    id: number;
    nom: string; 
   

    /**
     * Constructor
     *
     * @param typeDemande
     */
    constructor(typeDemande)
    {
        this.id = typeDemande.id||FuseUtils.generateGUID();
        this.nom = typeDemande.nom;
    
       
    }
}
