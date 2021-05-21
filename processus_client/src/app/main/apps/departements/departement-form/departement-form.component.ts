import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'app/models/user';
import { DirectionsService } from 'app/services/directions.service';
import { UsersService } from 'app/services/users.service';
import { UserService } from 'app/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    directions: Direction[]=[];
    directeurs: User[] = [];
    users: any;
    managers: User[] = [];
    private _unsubscribeAll: Subject<any>;

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
        private departementService: DepartementsService,
        private directionsService: DirectionsService,
        private _usersService: UsersService,
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
        this._usersService.onUsersChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(users => {
            this.users = users;
            this.directeurs = this.users.filter(d => d.poste == 'DIRECTEUR')
            this.managers = this.users.filter(d => d.poste == 'MANAGER')

        });


        this.directionsService.getDirections().then(data => this.directions= data);
        // this.usersService.getUsers().then(date => this this.users= data);
        

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
