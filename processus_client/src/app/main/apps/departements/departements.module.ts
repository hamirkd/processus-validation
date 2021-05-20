import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatOption, MatOptionModule, MatSelect, MatSelectModule
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { DepartementsComponent } from './departements.component';
import { DepartementsService } from './departements.service';
import { ListDepartementsComponent } from './departement-list/departement-list.component';
import { FormDialogDepartementComponent } from './departement-form/departement-form.component';


const routes: Routes = [
    {
        path     : '**',
        component: DepartementsComponent,
        resolve  : {
            departements: DepartementsService
        }
    }
];

@NgModule({
    declarations   : [
        
        DepartementsComponent,
        ListDepartementsComponent,
        FormDialogDepartementComponent,

       
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
        DepartementsService
    ],
    entryComponents: [
        FormDialogDepartementComponent,
    ]
})
export class DepartementsModule
{
}
