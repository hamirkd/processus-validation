import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jspdf from 'jspdf';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DepartementsService } from '../departements.service';
import { FormDialogDepartementComponent } from '../departement-form/departement-form.component';

@Component({
    selector: 'departements-list',
    templateUrl: './departement-list.component.html',
    styleUrls: ['./departement-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListDepartementsComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    departements: any;
    departement: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['nom', 'direction', 'manager', 'directeur', 'createdAt', 'buttons'];
    selectedDepartements: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _departementsService: DepartementsService,
        public _matDialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._departementsService);
        console.log(this.dataSource)
        this._departementsService.onDepartementsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(departements => {
                this.departements = departements;

                this.checkboxes = {};
                departements.map(departement => {
                    this.checkboxes[departement.id] = false;
                });
            });

        this._departementsService.onSelectedDepartementsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedDepartements => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = this.selectedDepartements.includes(id);
                }
                this.selectedDepartements = this.selectedDepartements;
            });

        this._departementsService.onDepartementDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(departement => {
                this.departement = departement;
            });

        this._departementsService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._departementsService.deselectDepartements();
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
     * @param departement
     */
    editDepartement(departement): void {
        this.dialogRef = this._matDialog.open(FormDialogDepartementComponent, {
            panelClass: 'departement-form-dialog',
            data: {
                departement: departement,
                action: 'edit'
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

                        this._departementsService.updateDepartement(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteDepartement(departement);

                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteDepartement(departement): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous vraiment le supprimer?';

        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this._departementsService.deleteSelectedDepartements(departement);
        //     }
        //     this.confirmDialogRef = null;
        // });

    }

    /**
     * On selected change
     *
     * @param departementId
     */
    onSelectedChange(departementId): void {
        this._departementsService.toggleSelectedDepartement(departementId);
    }

    /**
     * Toggle star
     *
     * @param departementId
     */
    toggleStar(departementId): void {
        if (this.departement.starred.includes(departementId)) {
            this.departement.starred.splice(this.departement.starred.indexOf(departementId), 1);
        }
        else {
            this.departement.starred.push(departementId);
        }

        this._departementsService.updateDepartementData(this.departement);
    }





}

export class FilesDataSource extends DataSource<any>
{

    constructor(
        private _departementsService: DepartementsService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._departementsService.onDepartementsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
