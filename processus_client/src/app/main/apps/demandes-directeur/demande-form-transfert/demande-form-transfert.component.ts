import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'app/models/user';
import { DirectionsService } from 'app/services/directions.service';
import { UsersService } from 'app/services/users.service';
import { Departement } from '../../departements/departement.model';
import { DepartementsService } from '../../departements/departements.service';
import { Demande } from '../demande.model';
import { DemandesService } from '../demandes.service';


@Component({
    selector: 'demande-form-dialog-transfert',
    templateUrl: './demande-form-transfert.component.html',
    styleUrls: ['./demande-form-transfert.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogTransfertDemandeComponent {
    action: string;
    demande: Demande;
    demandeForm: FormGroup;
    dialogTitle: string;
    managers: User[] = [];
    directeurs: User[] = [];
    users: User[] = [];
    directions: Direction[] = [];
    departements: Departement[] = [];

    choix: boolean = true;
    contrainteChoix: boolean = true;
    user: User;
    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogTransfertDemandeComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogTransfertDemandeComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private demandeService: DemandesService,
        private _usersService: UsersService,
        private _directionsService: DirectionsService,
        private _departementsService: DepartementsService
    ) {
        this.user = this._usersService.userData;
        // Set the defaults
        this.action = _data.action;
        
        this.dialogTitle = 'Transferer une demande';
        this.demande = _data.demande;

        this._usersService.getUsers().then(users=>{
            this.users = users;
            this.directeurs = this.users.filter(d => d.poste == 'DIRECTEUR');
            this.managers = this.users.filter(d => d.poste == 'MANAGER');
        })

        this._directionsService.getDirections().then(directions => {
            this.directions = directions;
        }).catch(() => this.directions = [])



        this._departementsService.getDepartements().then(departements => {
            this.departements = departements;
        }).catch(() => this.departements = [])

        this.demandeForm = this.createDemandeForm();
    }
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
    createDemandeForm(): FormGroup {
        
        return this._formBuilder.group({
            id: [this.demande.id],
            direction: [this.demande.direction],
            departement_id: [this.demande.departement ? this.demande.departement.id : 0],
            directeur: [this.demande.directeur],
            manager: [this.demande.manager],
        });
    }
    // onFileChanged(event) {
    //     if (event.target.files && event.target.files[0]) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(event.target.files[0]);
    //         reader.onload = (event) => {
    //             let eve: any = event.target;
    //             this.demande.nom = eve.result;
    //         }
    //     }
    //     else {
    //         this.demande.nom = null;
    //     }
    // }
    transferer() {
        // let demandeData: Demande = this.demandeForm.getRawValue();
        // demandeData.departement = this.user.departement;
        // this.demande = demandeData;
        // let demandeForm = this.createDemandeForm();
        this.matDialogRef.close(this.demandeForm);
    }


    // conChoix(value){
    //     if(value=='vitesse'){
    //         this.contrainteChoix=true;
    //     }else if(value=='zone'){
    //         this.contrainteChoix=false;

    //     }
    // }

}
