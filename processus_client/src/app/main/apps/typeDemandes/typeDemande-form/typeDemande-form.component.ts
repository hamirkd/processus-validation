import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TypeDemande } from '../typeDemande.model';
import { TypeDemandesService } from '../typeDemandes.service';



@Component({
    selector: 'typeDemande-form-dialog',
    templateUrl: './typeDemande-form.component.html',
    styleUrls: ['./typeDemande-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogTypeDemandeComponent {
    action: string;
    typeDemande: TypeDemande;
    typeDemandeForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogTypeDemandeComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private typeDemandesService: TypeDemandesService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modier Type de demande';
            this.typeDemande = _data.typeDemande;
        }
        else {
            this.dialogTitle = 'Ajouter un type de demande';
            this.typeDemande = new TypeDemande({});
        }

        this.typeDemandeForm= this.createTypeDemandeForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
     createTypeDemandeForm(): FormGroup {
        
        return this._formBuilder.group({
            id: [this.typeDemande.id],
            nom: [this.typeDemande.nom],
            description: [this.typeDemande.description],
            createdAt:[this.typeDemande.createdAt],
            
            
        
            
            
        });
    }
}
