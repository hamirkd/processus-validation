import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { TypeDemandesService } from '../typeDemandes.service';
import { FormDialogTypeDemandeComponent } from '../typeDemande-form/typeDemande-form.component';
import {environment} from '../../../../../environments/environment';
import {isArray} from 'util';
import {HttpClient} from '@angular/common/http';
import {Direction} from '../../../../models/direction';


@Component({
    selector: 'typeDemandes-list',
    templateUrl: './typeDemande-list.component.html',
    styleUrls: ['./typeDemande-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListTypeDemandeComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    typeDemandes: any;
    typeDemande: any;
    departement: []=[];
    dataSource: FilesDataSource | null;ss
    displayedColumns = ['nom','workFlowDirection','workFlowDepartement','createdAt', 'buttons'];
    selectedTypeDemandes: any[];
    directions: Direction[] = [];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _typeDemandesService: TypeDemandesService,
        public _matDialog: MatDialog,
        private httpClient: HttpClient
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
        this.getAllDirection();
        this.dataSource = new FilesDataSource(this._typeDemandesService);
        console.log(this.dataSource)
        this._typeDemandesService.onTypeDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(typeDemandes => {
                this.typeDemandes = typeDemandes;

                this.checkboxes = {};
                typeDemandes.map(typeDemande => {
                    this.checkboxes[typeDemande.id] = false;
                });
            });

        this._typeDemandesService.onSelectedTypeDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedtypeDemandes => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedtypeDemandes.includes(id);
                }
                this.selectedTypeDemandes = this.selectedTypeDemandes;
            });

        this._typeDemandesService.onTypeDemandeDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(typeDemande => {
                this.typeDemande = typeDemande;
            });

        this._typeDemandesService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._typeDemandesService.deselectTypeDemandes();
            });
    }


    getAllDirection(): void {
        this.httpClient
            .get(environment.addressIp + '/api/directions')
            .subscribe((response: any) =>
                    this.directions = response && isArray(response) ? response : []
                , () => this.directions = []);
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


    editTypeDemande(typeDemande): void {
        this.dialogRef = this._matDialog.open(FormDialogTypeDemandeComponent, {
            panelClass: 'typeDemande-form-dialog',

            data: {
                typeDemande: typeDemande,
                action: 'edit',
                directions: this.directions,
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

                        this._typeDemandesService.updateTypeDemande(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteTypeDemande(typeDemande);

                        break;
                }
            });
    }

    /**
     * Delete Contact
     */
    deleteTypeDemande(typeDemande): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous vraiment le supprimer?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._typeDemandesService.deleteTypeDemande(typeDemande);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(typeDemandeId): void {
        this._typeDemandesService.toggleSelectedTypeDemande(typeDemandeId);
    }


    toggleStar(typeDemandeId): void {
        if (this.typeDemande.starred.includes(typeDemandeId)) {
            this.typeDemande.starred.splice(this.typeDemande.starred.indexOf(typeDemandeId), 1);
        }
        else {
            this.typeDemande.starred.push(typeDemandeId);
        }

        this._typeDemandesService.updateTypeDemandeData(this.typeDemande);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {TransfertsService} _transfertsService
     */
    constructor(
        private _typeDemandesService: TypeDemandesService,
        
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._typeDemandesService.onTypeDemandesChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
