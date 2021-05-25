import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatOption, MatOptionModule, MatSelect, MatSelectModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { DemandesComponent } from './demandes.component';
import { ListDemandesComponent } from './demande-list/demande-list.component';
import { FormDialogDemandeComponent } from './demande-form/demande-form.component';
import { DemandesService } from './demandes.service';
import { FormDialogTransfertDemandeComponent } from './demande-form-transfert/demande-form-transfert.component';
import { DepartementsService } from '../departements/departements.service';


const routes: Routes = [
    {
        path     : '**',
        component: DemandesComponent,
        resolve  : {
            demandes: DemandesService
        }
    }
];

@NgModule({
    declarations   : [
       
        DemandesComponent,
        ListDemandesComponent,
        FormDialogDemandeComponent,FormDialogTransfertDemandeComponent,
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatOptionModule,
        MatSelectModule,
    ],
    providers      : [
        DemandesService,DepartementsService
    ],
    entryComponents: [
        FormDialogDemandeComponent,FormDialogTransfertDemandeComponent
    ]
})
export class DemandesModule
{
}
