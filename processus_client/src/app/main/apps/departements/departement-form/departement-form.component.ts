import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Departement } from '../departement.model';
import { DepartementsService } from '../departements.service';

@Component({
    selector: 'departement-form-dialog',
    templateUrl: './departement-form.component.html',
    styleUrls: ['./departement-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogDepartementComponent {
    action: string;
    departement: Departement;
    departementForm: FormGroup;
    dialogTitle: string;
    
    choix:boolean=true;
    contrainteChoix:boolean = true;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogEncadreurComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogDepartementComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private departementService: DepartementsService
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Departement';
            this.departement = _data.departement;
        }
        else {
            this.dialogTitle = 'Nouveau departement';
            this.departement = new Departement({});
        }

        this.departementForm = this.createDepartementForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
     createDepartementForm(): FormGroup {

        return this._formBuilder.group({
            id: [this.departement.id],
            nom: [this.departement.nom],
            direction: [this.departement.direction],
            manager: [this.departement.manager],
            directeur: [this.departement.directeur],
            createdAt: [this.departement.createdAt],



        });
    }
    onFileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                let eve: any = event.target;
                this.departement.nom = eve.result;
            }
        }
        else {
            this.departement.nom = null;
        }
    }
    save() {
        let departementData: Departement = this.departementForm.getRawValue();
        departementData.nom = this.departement.nom;
        this.departement = departementData;
        let departementForm = this.createDepartementForm();
        this.matDialogRef.close(this.departementForm);
    }


   

}
