import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TypeDemande} from '../typeDemande.model';
import {TypeDemandesService} from '../typeDemandes.service';
import {Direction} from '../../../../models/direction';


@Component({
    selector: 'typeDemande-form-dialog',
    templateUrl: './typeDemande-form.component.html',
    styleUrls: ['./typeDemande-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogTypeDemandeComponent implements OnInit {
    action: string;
    typeDemande: TypeDemande;
    typeDemandeForm: FormGroup;
    dialogTitle: string;
    directions: Direction[] = [];

    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param typeDemandesService
     * @param httpClient
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogTypeDemandeComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private typeDemandesService: TypeDemandesService,
    ) {
        // Set the defaults
        this.action = _data.action;
        this.directions = _data.directions;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modier Type de demande';
            this.typeDemande = _data.typeDemande;
        } else {
            this.dialogTitle = 'Ajouter un type de demande';
            this.typeDemande = new TypeDemande({});
        }

        this.typeDemandeForm = this.createTypeDemandeForm();
    }

    ngOnInit(): void {
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
            workFlowDirection: [this.typeDemande.workFlowDirection],
            createdAt: [this.typeDemande.createdAt],
        });
    }

    comparatorDirection(d: Direction, d2: Direction): boolean {
        return d && d2 && d.id === d2.id;
    }
}
