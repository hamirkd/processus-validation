import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [


    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'

    },


    {
        path: 'demandes',
        loadChildren: './demandes/demandes.module#DemandesModule'
    },



    // {
    //     path: 'departements',
    //     loadChildren: './departements/departements.module#DepartementsModule'
    // },


    {
        path: 'typeDemandes',
        loadChildren: './typeDemandes/typeDemandes.module#TypeDemandesModule'
    },

    
    {
        path: 'demandes-directeur',
        loadChildren: './demandes-directeur/demandes.module#DemandesModule'
    },


   


    {
        path: 'demandes-manager',
        loadChildren: './demandes-manager/demandes.module#DemandesModule'
    },


    // {
    //     path: 'autreDemanades',
    //     loadChildren: './autreDemanades/demandes.module#DemandesModule'
    // },



];

@NgModule({

    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule
    ]
})
export class AppsModule {
}
