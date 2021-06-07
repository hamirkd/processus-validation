import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TypeDemande} from '../typeDemande.model';
import {TypeDemandesService} from '../typeDemandes.service';
import {Direction} from '../../../../models/direction';
import {Departement} from '../../departements/departement.model';
import {Subscription} from 'rxjs';
import {DepartementsService} from '../../departements/departements.service';

@Component({
    selector: 'typeDemande-form-dialog',
    templateUrl: './typeDemande-form.component.html',
    styleUrls: ['./typeDemande-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogTypeDemandeComponent implements OnInit, OnDestroy {
    action: string;
    typeDemande: TypeDemande;
    typeDemandeForm: FormGroup;
    dialogTitle: string;
    directions: Direction[] = [];
    departements: Departement[] = [];
    subscription: Subscription;


    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogTypeDemandeComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private typeDemandesService: TypeDemandesService,
        private departementsService: DepartementsService,
    ) {
        // Set the defaults
        this.action = _data.action;
        this.directions = _data.directions;
        this.departements = _data.departements;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modier Type de demande';
            this.typeDemande = _data.typeDemande;
        } else {
            this.dialogTitle = 'Ajouter un type de demande';
            this.typeDemande = new TypeDemande({});
        }

        this.typeDemandeForm = this.createTypeDemandeForm();
        this.typeDemandeForm.get('workFlowDirection').valueChanges.subscribe(value => {
            if (value && value.id) {
                this.departementsService
                    .findByDirection(value.id)
                    .toPromise()
                    .then(value1 => this.departements = value1);
            } else {
                this.departements = [];
            }

        });
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
            workFlowDepartement: [this.typeDemande.workFlowDepartement],
            createdAt: [this.typeDemande.createdAt],
        });
    }

    comparatorDirection(d: Direction, d2: Direction): boolean {
        return d && d2 && d.id === d2.id;
    }

    comparatorDepartement(d: Departement, d2: Departement): boolean {
        return d && d2 && d.id === d2.id;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}
