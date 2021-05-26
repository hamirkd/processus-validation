import { FuseUtils } from '@fuse/utils';

export class TypeDemande
{
    id: number;
    nom: string;
    description: string; 
    createdAt: Date;

   

    /**
     * Constructor
     *
     * @param typeDemande
     */
    constructor(typeDemande)
    {
        this.id = typeDemande.id||FuseUtils.generateGUID();
        this.nom = typeDemande.nom;
        this.description = typeDemande.description;
        this.createdAt = typeDemande.createdAt;
    
       
    }
}
