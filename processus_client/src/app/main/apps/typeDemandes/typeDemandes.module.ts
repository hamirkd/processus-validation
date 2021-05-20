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
import { TypeDemandesComponent } from './typeDemandes.component';
import { TypeDemandesService } from './typeDemandes.service';
import { ListTypeDemandeComponent } from './typeDemande-list/typeDemande-list.component';
import { FormDialogTypeDemandeComponent } from './typeDemande-form/typeDemande-form.component';

const routes: Routes = [
    {
        path     : '**',
        component: TypeDemandesComponent,
        resolve  : {
            typeDemandes: TypeDemandesService
        }
    }
];

@NgModule({
    declarations   : [

    TypeDemandesComponent,
    ListTypeDemandeComponent,
    FormDialogTypeDemandeComponent,
        

        
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
        TypeDemandesService, 
    ],
    entryComponents: [
        FormDialogTypeDemandeComponent,
    ]
})
export class TypeDemandesModule
{
}
