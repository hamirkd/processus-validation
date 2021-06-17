import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import {DemandesService} from '../demandes.service';
import {FormDialogDemandeComponent} from '../demande-form/demande-form.component';
import {Demande} from '../../demandes-directeur/demande.model';

@Component({
    selector: 'demandes-list',
    templateUrl: './demande-list.component.html',
    styleUrls: ['./demande-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ListDemandesComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    demandes: any;
    demande: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['nom', 'prenom', 'direction','typeDemande', 'description','etat', 'createdAt', 'buttons'];
    selectedDemandes: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EncadreursService} _demandesService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _demandesService: DemandesService,
        public _matDialog: MatDialog
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._demandesService);
        this._demandesService.onDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(demandes => {
                this.demandes = demandes;
                this.checkboxes = {};
                demandes.map(demande => {
                    this.checkboxes[demande.id] = false;
                });
            });

        this._demandesService.onSelectedDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedDemandes => {
                for (const id in this.checkboxes) {
                    if (!this.checkboxes.hasOwnProperty(id)) {
                        continue;
                    }

                    this.checkboxes[id] = selectedDemandes.includes(id);
                }
                this.selectedDemandes = selectedDemandes;
            });

        this._demandesService.onDemandeDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(demande => {
                this.demande = demande;
            });

        this._demandesService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._demandesService.deselectDemandes();
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
     * @param demande
     */
    editDemande(demande: Demande): void {
        this.dialogRef = this._matDialog.open(FormDialogDemandeComponent, {
            panelClass: 'demande-form-dialog',
            data: {
                demande: demande,
                action: 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!response) {
                    return;
                }

                const formData: FormGroup = response;


                const data = formData.getRawValue();
                data.id = demande.id;
                this._demandesService.updateDemande(data);

            });
    }

    show(demande): void {
        this.dialogRef = this._matDialog.open(FormDialogDemandeComponent, {
            panelClass: 'demande-form-dialog',
            data: {
                demande: demande,
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
                        const data = formData.getRawValue();
                        data.id = demande.id;
                        this._demandesService.updateDemande(data);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteDemande(demande);

                        break;
                }
            });
    }

    /**
     * Delete demande
     */
    deleteDemande(demande): void {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Voulez vous vraiment le supprimer?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._demandesService.deleteDemande(demande);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param encadreurId
     */
    onSelectedChange(demandeId): void {
        this._demandesService.toggleSelectedDemande(demandeId);
    }

    /**
     * Toggle star
     *
     * @param demandeId
     */
    toggleStar(demandeId): void {
        if (this.demande.starred.includes(demandeId)) {
            this.demande.starred.splice(this.demande.starred.indexOf(demandeId), 1);
        } else {
            this.demande.starred.push(demandeId);
        }

        this._demandesService.updateDemandeData(this.demande);
    }


}

export class FilesDataSource extends DataSource<any> {
    /**
     * Constructor
     *
     * @param {EncadreursService} _demandesService
     */
    constructor(
        private _demandesService: DemandesService
    ) {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        return this._demandesService.onDemandesChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
