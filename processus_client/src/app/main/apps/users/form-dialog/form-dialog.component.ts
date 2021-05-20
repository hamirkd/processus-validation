import { Direction } from '@angular/cdk/bidi';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'app/models/user';
import { DirectionsService } from 'app/services/directions.service';
import { UsersService } from 'app/services/users.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'form-dialog-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormDialogComponent {
    action: string;
    user: User;
    userForm: FormGroup;
    dialogTitle: string;
    
    choix:boolean=true;
    contrainteChoix:boolean = true;
    managers:User[]=[];
    directeurs:User[]=[];
    users:User[]=[];
    directions:Direction[]=[];
    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     *
     * @param {MatDialogRef<FormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _usersService: UsersService,
        private _directionsService:DirectionsService
    ) {
        this.user = this._usersService.userData;
        // Set the defaults
        this.action = _data.action;
        this._unsubscribeAll = new Subject();

        if (this.action === 'edit') {
            this.dialogTitle = 'Modifier un utilisateur';
            this.user = _data.user;
        }
        else if(this.action === 'new') {
            this.dialogTitle = 'Ajouter un utilisateur';
            this.user = new User({});
        }
        else{
            this.dialogTitle = 'Afficher un utilisateur';
            this.user = _data.user;
        }
        this._usersService.onUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(users => {
                this.users = users;
                this.directeurs = this.users.filter(d=>d.poste=='DIRECTEUR')
                this.managers = this.users.filter(d=>d.poste=='MANAGER')
            });
            this._directionsService.getDirections().then(directions=>{
                this.directions = directions;
            }).catch(()=>this.directions=[])
        this.userForm = this.createUserForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user form
     *
     * @returns {FormGroup}
     */
       createUserForm(): FormGroup {
        
        return this._formBuilder.group({
            id: [this.user.id],
            nom: [this.user.nom],
            prenom: [this.user.prenom],
            direction_id: [this.user.direction?this.user.direction.id:0],
            poste: [this.user.poste],
            directeur_id: [this.user.directeur?this.user.directeur.id:0],
            manager_id: [this.user.manager?this.user.manager.id:0],
            email: [this.user.email],
            password: [this.user.password]
        });
    }
    
    
    save() {
        let userData: User = this.userForm.getRawValue();
        userData.id = this.user.id;
        this.user = userData;
        // console.log
        let userForm = this._formBuilder.group(this.user);
        this.matDialogRef.close(userForm);
    }

    

}
