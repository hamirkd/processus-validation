import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Direction } from 'app/models/direction';
import { User } from 'app/models/user';
import { DirectionsService } from 'app/services/directions.service';
import { UsersService } from 'app/services/users.service';
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
    directions: Direction[]= [];
    managers: User[]=[];

    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogDepartementComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private departementsService: DepartementsService,
        private directionsService: DirectionsService,
        private usersService : UsersService,
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Modier Type de demande';
            this.departement = _data.departement;
        }
        else {
            this.dialogTitle = 'Ajouter un departement';
            this.departement = new Departement({});
        }


        this.directionsService.getDirections().then(data => this.directions = data);
        this.usersService.getUsers().then(data =>this.managers = data );  
        this.departementForm= this.createDepartementForm();
    }

    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create departement form
     *
     * @returns {FormGroup}
     */
     createDepartementForm(): FormGroup {
        
        return this._formBuilder.group({
            id: [this.departement.id],
            nom: [this.departement.nom],
            direction: [this.departement.direction],
            // manager: [this.departement.manager],
            createdAt:[this.departement.createdAt],
            
            
        
            
            
        });
    }
}
