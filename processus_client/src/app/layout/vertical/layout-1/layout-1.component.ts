import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation_, navigation_administrateur, navigation_directeur, navigation_employe, navigation_manager } from 'app/navigation/navigation';
import { User } from 'app/models/user';

@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService
    )
    {
        // Set the defaults

        this.navigation = navigation_;
        if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
            const user: User = JSON.parse(localStorage.getItem('user'));
            switch (user.poste) {
                case 'DIRECTEUR':
                    this.navigation = navigation_directeur;
                    break;
                case 'MANAGER':
                    this.navigation = navigation_manager;
                    break;
                case 'EMPLOYE':
                    this.navigation = navigation_employe;

                    break;
                    case 'ADMINISTRATEUR':
                        this.navigation = navigation_administrateur;
    
                        break;

                    // case 'EXECUTIVE':
                    //     this.navigation = navigation_executive;
    
                    //     break;



                    //     case 'ASSISTANT_MANAGER':
                    //     this.navigation = navigation_assistant_manager;
    
                    //     break;


                        // case 'SUPERVISEUR':
                        //     this.navigation = navigation_assistant_manager;
        
                        //     break;
            }
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
