import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TypeDemandesService } from './typeDemandes.service';
import { FormDialogTypeDemandeComponent } from './typeDemande-form/typeDemande-form.component';
import {Direction} from '../../../models/direction';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {isArray} from 'util';


@Component({
    selector     : 'typeDemandes',
    templateUrl  : './typeDemandes.component.html',
    styleUrls    : ['./typeDemandes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class TypeDemandesComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedTypeDemandes: boolean;
    searchInput: FormControl;
    directions: Direction[] = [];


    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _typeDemandesService: TypeDemandesService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        private httpClient: HttpClient
    )
    {
        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }


    ngOnInit(): void
    {
        this.getAllDirection();
        this._typeDemandesService.onSelectedTypeDemandesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedRegions => {
                this.hasSelectedTypeDemandes = selectedRegions.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._typeDemandesService.onSearchTextChanged.next(searchText);
            });
    }

    getAllDirection(): void {
        this.httpClient
            .get(environment.addressIp + '/api/directions')
            .subscribe((response: any) =>
                    this.directions = response && isArray(response) ? response : []
                , () => this.directions = []);
    };

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * New contact
     */
    newRegion(): void
    {
        this.dialogRef = this._matDialog.open(FormDialogTypeDemandeComponent, {
            panelClass: 'typeDemande-form-dialog',
            data      : {
                action: 'new',
                directions: this.directions,
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._typeDemandesService.updateTypeDemande(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
