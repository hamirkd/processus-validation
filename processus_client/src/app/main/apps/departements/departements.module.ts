import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
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
    MatOptionModule,
    MatSelectModule,
    MatTabsModule, MatAutocompleteModule, MatAutocomplete
} from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
// import { MatFileUploadModule } from 'angular-material-fileupload';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { DepartementsComponent } from './departements.component';
import { DepartementsService } from './departements.service';
import { FormDialogDepartementComponent } from './departement-form/departement-form.component';
import { ListDemandesComponent } from '../aministrateur/demande-list/demande-list.component';
import { ListDepartementComponent } from './departement-list/departement-list.component';

const routes: Routes = [
    {
        path     : '**',
        component: DepartementsComponent,
        resolve  : {
            departements: DepartementsService        }
    }
];

@NgModule({
    declarations   : [

    DepartementsComponent,
    FormDialogDepartementComponent,
    ListDepartementComponent,
   
        

        
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule, AutoCompleteModule,
        // MatFileUploadModule,
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
        MatTableModule,
        MatTabsModule,
        MatAutocompleteModule,
        NgxMatSelectSearchModule,

    
    ],
    providers      : [
        DepartementsService, 
    ],
    entryComponents: [
        FormDialogDepartementComponent,
    ]
})
export class DepartementsModule
{
}
