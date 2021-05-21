import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FuseUtils } from '@fuse/utils';
import { environment } from 'environments/environment';
import { Departement } from './departement.model';


@Injectable()
export class DepartementsService implements Resolve<any>
{
    onDepartementsChanged: BehaviorSubject<any>;
    onSelectedDepartementsChanged: BehaviorSubject<any>;
    onDepartementDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;


    departements: Departement[];
    departement: any;
    selectedDepartements: number[] = [];

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
        this.onDepartementsChanged = new BehaviorSubject([]);
        this.onSelectedDepartementsChanged = new BehaviorSubject([]);
        this.onDepartementDataChanged = new BehaviorSubject([]);
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
                this.getDepartements(),
                this.getDepartementData()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getDepartements();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getDepartements();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get Users
     *
     * @returns {Promise<any>}
     */
     getDepartements(): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get(environment.addressIp+'/api/departements')
                .subscribe((response: any) => {

                    this.departements = response;

                    if (this.filterBy === 'starred') {
                        this.departements = this.departements.filter(_Departement => {
                            return this.departement.starred.includes(_Departement.id);
                        });
                    }

                    if (this.filterBy === 'frequent') {
                        this.departements = this.departements.filter(_Departement => {
                            return this.departement.frequentDepartements.includes(_Departement.id);
                        });
                    }

                    if (this.searchText && this.searchText !== '') {
                        this.departements = FuseUtils.filterArrayByString(this.departements, this.searchText);
                    }

                    this.departements = this.departements.map(departement => {
                        return new Departement(departement);
                    });

                    this.onDepartementsChanged.next(this.departement);
                    resolve(this.departements);
                }, reject => {
                    this.departements = [];
                });
        }
        );
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getDepartementData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.addressIp+'/api/departements')
                .subscribe((response: any) => {
                    this.departement = response;
                    this.onDepartementDataChanged.next(this.departement);
                    resolve(this.departement);
                }, reject);
        }
        );
    }

    /**
     * Toggle selected User by id
     *
     * @param id
     */
    toggleSelectedDepartement(id): void {
        // First, check if we already have that User as selected...
        if (this.selectedDepartements.length > 0) {
            const index = this.selectedDepartements.indexOf(id);

            if (index !== -1) {
                this.selectedDepartements.splice(index, 1);

                // Trigger the next event
                this.onSelectedDepartementsChanged.next(this.selectedDepartements);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedDepartements.push(id);

        // Trigger the next event
        this.onSelectedDepartementsChanged.next(this.selectedDepartements);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedDepartements.length > 0) {
            this.deselectDepartements();
        }
        else {
            this.selectDepartements();
        }
    }

    /**
     * Select Users
     *
     * @param filterParameter
     * @param filterValue
     */
    selectDepartements(filterParameter?, filterValue?): void {
        this.selectedDepartements = [];

        // If there is no filter, select all Users
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedDepartements = [];
            this.departements.map(Departement => {
                this.selectedDepartements.push(Departement.id);
            });
        }

        // Trigger the next event
        this.onSelectedDepartementsChanged.next(this.selectDepartements);
    }

    /**
     * Update User
     *
     * @param Encadreur
     * @returns {Promise<any>}
     */
    updateDepartement(departement: Departement): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(departement)

            this._httpClient.put(environment.addressIp+'/api/departements', departement)
                .subscribe(response => {
                    this.getDepartements();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param departementData
     * @returns {Promise<any>}
     */
    updateDepartementData(departementData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(environment.addressIp+'/api/departements' + this.departement.id, { ...departementData })
                .subscribe(response => {
                    this.getDepartementData();
                    this.getDepartements();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect Users
     */
    deselectDepartements(): void {
        this.selectedDepartements = [];

        // Trigger the next event
        this.onSelectedDepartementsChanged.next(this.selectedDepartements);
    }

    /**
     * Delete User
     *
     * @param Departement
     */
    deleteEncadreur(departement: Departement): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(departement)
            this._httpClient.delete(environment.addressIp+'/api/departements/' + departement.id)
                .subscribe(response => {
                    this.getDepartements();
                    resolve(response);
                });
        });
    }

    /**
     * Delete selected Users
     */
    deleteSelectedDepartements(): void {
        for (const DepartementId of this.selectedDepartements) {
            const Departement = this.departements.find(_Departement => {
                return _Departement.id === DepartementId;
            });
            const DepartementIndex = this.departements.indexOf(Departement);
            this.departements.splice(DepartementIndex, 1);
        }
        this.onDepartementsChanged.next(this.departements);
        this.deselectDepartements();
    }

}
