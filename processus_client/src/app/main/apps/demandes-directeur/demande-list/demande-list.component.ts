import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil, window } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { DemandesService } from '../demandes.service';
import { FormDialogDemandeComponent } from '../demande-form/demande-form.component';
import { Demande } from '../demande.model';
import { FormDialogTransfertDemandeComponent } from '../demande-form-transfert/demande-form-transfert.component';
import { FormDialogTransfertDemandeDirecteurComponent } from '../demande-form-transfert-directeur/demande-form-transfert-directeur.component';
import { RequestState } from '../../../../models/request-state';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AIRTEL_HEADER } from 'environments/logo';
import * as impression from './impression';
declare var jsPDF: any;

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
    name = 'jsPDF Exemple';
    title = 'html-to-pdf';
    demandes: any;
    demande: any;
    pdfmake: any;
    SLOW: 'SLOW';
    dataSource: FilesDataSource | null;
    displayedColumns = ['nom', 'prenom', 'direction', 'etatdirecteur', 'description', 'createdAt', 'buttons'];
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
        console.log(this.dataSource);
        this._demandesService.onDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(demandes => {
                this.demandes = demandes;
                console.log(this.demandes);
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
                const actionType: string = response[0];
                demande.etat.toString();
                switch (actionType) {
                    case 'ACCEPTER':
                        demande.etatdirecteur = 'ACCEPTER';
                        break;
                    case 'REJETER':
                        demande.etatdirecteur = 'REJETER';
                        break;
                }
                this._demandesService.signatureDemande(demande);
                this._demandesService.updateState({ requestId: demande ? demande.id : 0, isApproved: actionType }).then();


            });
    }

    /**
     * Cette fonctionnalit?? permet de transferer une demande
     * On change seulement le directeur, le manager et la direction par ceux ceux que l'on connait
     *
     * @param demande
     */
    transferer(demande: Demande): void {
        this.dialogRef = this._matDialog.open(FormDialogTransfertDemandeComponent, {
            panelClass: 'demande-form-dialog',
            data: {
                demande: demande,
                action: 'edit'
            }
        });


    }


    transfererDirecteur(demande: Demande): void {
        this.dialogRef = this._matDialog.open(FormDialogTransfertDemandeDirecteurComponent, {
            panelClass: 'demande-form-dialog-transfert-directeur',
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
                const _demande = response.getRawValue();
                this._demandesService.transfertDemandeManager(_demande);
                this._demandesService.transfertDemandeDirecteur(_demande);

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



    //  +++++++++++++++++++++++++++++++ cette methode nous permet de generer un dpf ++++++++++++++++++++++

    generatePDF(demande: Demande) {
        if (demande.typeDemande) {
            switch (demande.typeDemande.nom) {
                case 'JOB REQUEST':
                    impression.generationDemandeJobRequest(demande);
                    break;

                case 'APN':
                    impression.generationDemandeAPN(demande);
                    break;

                default:
                    impression.generationDemandeExemple(demande);
                    break;
            }
        }
        else {
            impression.generationDemandeExemple(demande);
        }
    }


    inprogress(demande: Demande): boolean {
        switch (demande.state) {
            case RequestState.INITIAL:
            case RequestState.APPROVED_MANAGER:
            case RequestState.APPROVED_DIRECTOR:
            case RequestState.REDIRECTED:
                return true;
            default:
                return false;

        }
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
