import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { environment } from 'environments/environment';
import { Demande } from '../demandes-directeur/demande.model';


@Injectable()
export class DemandesService implements Resolve<any>
{
    onDemandesChanged: BehaviorSubject<any>;
    onSelectedDemandesChanged: BehaviorSubject<any>;
    onDemandeDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;


    demandes: Demande[];
    demande: any;
    selectedDemandes: number[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onDemandesChanged = new BehaviorSubject([]);
        this.onSelectedDemandesChanged = new BehaviorSubject([]);
        this.onDemandeDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getDemandes(),
                this.getDemandeData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getDemandes();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getDemandes();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get Demandes
     *
     * @returns {Promise<any>}
     */
    getDemandes(): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.addressIp+'/api/demandes')
                .subscribe((response: any) => {

                    this.demandes = response;

                    if (this.filterBy === 'starred') {
                        this.demandes = this.demandes.filter(_Demande => {
                            return this.demande.starred.includes(_Demande.id);
                        });
                    }

                    if (this.filterBy === 'frequent') {
                        this.demandes = this.demandes.filter(_Demande => {
                            return this.demande.frequentDemandes.includes(_Demande.id);
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.demandes = FuseUtils.filterArrayByString(this.demandes, this.searchText);
                    }

                    this.demandes = this.demandes.map(demande => {
                        return new Demande(demande);
                    });

                    this.onDemandesChanged.next(this.demandes);
                    resolve(this.demandes);
                }, reject => {
                    this.demandes = [];
                });
        }
        );
    }

    /**
     * Get Demande data
     *
     * @returns {Promise<any>}
     */
    getDemandeData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.addressIp+'/api/demandes')
                .subscribe((response: any) => {
                    this.demande = response;
                    this.onDemandeDataChanged.next(this.demande);
                    resolve(this.demandes);
                }, reject);
        }
        );
    }

    /**
     * Toggle selected Demande by id
     *
     * @param id
     */
    toggleSelectedDemande(id): void {
        // First, check if we already have that Demande as selected...
        if (this.selectedDemandes.length > 0) {
            const index = this.selectedDemandes.indexOf(id);

            if (index !== -1) {
                this.selectedDemandes.splice(index, 1);

                // Trigger the next event
                this.onSelectedDemandesChanged.next(this.selectedDemandes);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedDemandes.push(id);

        // Trigger the next event
        this.onSelectedDemandesChanged.next(this.selectedDemandes);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedDemandes.length > 0) {
            this.deselectDemandes();
        }
        else {
            this.selectDemandes();
        }
    }

    /**
     * Select Demandes
     *
     * @param filterParameter
     * @param filterValue
     */
    selectDemandes(filterParameter?, filterValue?): void {
        this.selectedDemandes = [];

        // If there is no filter, select all Demandes
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedDemandes = [];
            this.demandes.map(Demande => {
                this.selectedDemandes.push(Demande.id);
            });
        }

        // Trigger the next event
        this.onSelectedDemandesChanged.next(this.selectDemandes);
    }

    /**
     * Update Demande
     *
     * @param Demande
     * @returns {Promise<any>}
     */
    //  updateDemande(demande: Demande): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.put(environment.addressIp+'/api/demandes', 
    //         {demandeur_id:demande.demandeur.id,
    //         description:demande.description,})
    //             .subscribe(response => {
    //                 this.getDemandes();
    //                 resolve(response);
    //             });
    //     });
    // }
    /**
     * Update Demande
     *
     * @param Demande
     * @returns {Promise<any>}
     */
    signatureDemande(demande: Demande): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(environment.addressIp+'/api/demandes/signature', 
            {id:demande.id,
                etatmanager:demande.etatmanager,})
                .subscribe(response => {
                    this.getDemandes();
                    resolve(response);
                });
        });
    }

    /**
     * Update Demande data
     *
     * @param demandeData
     * @returns {Promise<any>}
     */
    updateDemandeData(demandeData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.addressIp+'/api/demandes' + this.demande.id, { ...demandeData })
                .subscribe(response => {
                    this.getDemandeData();
                    this.getDemandes();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect Demandes
     */
    deselectDemandes(): void {
        this.selectedDemandes = [];

        // Trigger the next event
        this.onSelectedDemandesChanged.next(this.selectedDemandes);
    }

    /**
     * Delete Demande
     *
     * @param Demande
     */
    deleteDemande(demande: Demande): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(demande)
            this._httpClient.delete(environment.addressIp+'/api/demandes/' + demande.id)
                .subscribe(response => {
                    this.getDemandes();
                    resolve(response);
                });
        });
    }

    /**
     * Delete selected Demandes
     */
    deleteSelectedDemandes(): void {
        for (const DemandeId of this.selectedDemandes) {
            const Demande = this.demandes.find(_Demande => {
                return _Demande.id === DemandeId;
            });
            const DemandeIndex = this.demandes.indexOf(Demande);
            this.demandes.splice(DemandeIndex, 1);
        }
        this.onDemandesChanged.next(this.demandes);
        this.deselectDemandes();
    }

}
