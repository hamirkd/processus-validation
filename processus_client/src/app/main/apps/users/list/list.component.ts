import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { User } from 'app/models/user';
import { UsersService } from 'app/services/users.service';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    users: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['id','nom','prenom','direction','departement','poste','createdAt','buttons'];
    selectedUsers: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EncadreursService} _usersService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _usersService: UsersService,
        public _matDialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._usersService);
        this._usersService.onUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(users => {
                this.users = users;
                this.checkboxes = {};
                users.map(user => {
                    this.checkboxes[user.id] = false;
                });
            });

        this._usersService.onSelectedUsersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedUsers => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedUsers.includes(id);
                }
                this.selectedUsers = selectedUsers;
            });

        this._usersService.onUserDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            });

        this._usersService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._usersService.deselectUsers();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit Pelerin
     * 
     *
     * @param user
     */
    editUser(user:User): void {
        this.dialogRef = this._matDialog.open(FormDialogComponent, {
            panelClass: 'form-dialog',
            data: {
                user: user,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                
                const formData: FormGroup = response;
                
                

                        this._usersService.updateUsers(formData.getRawValue(),user.id);

            });
    }
    show(user): void {
        this.dialogRef = this._matDialog.open(FormDialogComponent, {
            panelClass: 'form-dialog',
            data: {
                user: user,
                action: 'show'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch (actionType) {
                    /**
                     * Save
                     */
                    case 'save':

                        this._usersService.updateUsers(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteUser(user);

                        break;
                }
            });
    }

    /**
     * Delete user
     */
    deleteUser(user): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous vraiment le supprimer?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._usersService.deleteUser(user);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param encadreurId
     */
    onSelectedChange(userId): void {
        this._usersService.toggleSelectedUser(userId);
    }

    /**
     * Toggle star
     *
     * @param userId
     */
    toggleStar(userId): void {
        if (this.user.starred.includes(userId)) {
            this.user.starred.splice(this.user.starred.indexOf(userId), 1);
        }
        else {
            this.user.starred.push(userId);
        }

        this._usersService.updateUserData(this.user);
    }




    
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {EncadreursService} _usersService
     */
    constructor(
        private _usersService: UsersService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._usersService.onUsersChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
