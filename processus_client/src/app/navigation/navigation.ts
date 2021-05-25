import { FuseNavigation } from '@fuse/types';

export const navigation_: FuseNavigation[] = [
    {
        id: 'perminssion',
        title: 'Permissions',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [
            // {
            //     id: 'contacts',
            //     title: 'Contacts',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'account_box',
            //     url: '/apps/contacts'
            // },
            {
                id: 'users',
                title: 'Utilisateurs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'people',
                url: '/apps/users'

            },

            {
                id: 'profile',
                title: 'Profiles',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'vpn_key',
                url: '/apps/profile'

            },

            {
                id: 'logs',
                title: 'Logs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'star_border',
                url: '/apps/logs'

            }

        ]
    },


    {
        id: 'application',
        title: 'Application',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'pagne',
                title: 'Pagne',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'wax',
                url: '/apps/pagnes'
            },
            {
                id: 'Demande',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes'
            },
            {
                id: 'Demande-directeur',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes-directeur'
            }
            ,
            {
                id: 'Demande-manager',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes-manager'
            }

        ]
    },

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'Manager',
                        title: 'Manager',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },




                    {
                        id: 'Ressource',
                        title: 'Ressource humaine',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },







        ]
    },

]

// +++++++++++++++++++++++++++++++++++++ Navigation Administrateur +++++++++++++++++++++++++++++
export const navigation_directeur: FuseNavigation[] = [
    {
        id: 'perminssion',
        title: 'Permissions',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [
            // {
            //     id: 'contacts',
            //     title: 'Contacts',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'account_box',
            //     url: '/apps/contacts'
            // },
            // {
            //     id: 'users',
            //     title: 'Utilisateurs',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'people',
            //     url: '/apps/users'

            // },

            // {
            //     id: 'profile',
            //     title: 'Profiles',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'vpn_key',
            //     url: '/apps/profile'

            // },

            // {
            //     id: 'logs',
            //     title: 'Logs',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'star_border',
            //     url: '/apps/logs'

            // }

        ]
    },


    {
        id: 'application',
        title: 'Application',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [
            // {
            //     id: 'pagne',
            //     title: 'Pagne',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'wax',
            //     url: '/apps/pagnes'
            // },
            {
                id: 'Demande-directeur',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes-directeur'
            }

        ]
    },

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    // {
                    //     id: 'Manager',
                    //     title: 'Manager',
                    //     type: 'item',
                    //     url: '/apps/dashboards/analytics'
                    // },




                    // {
                    //     id: 'Ressource',
                    //     title: 'Ressource humaine',
                    //     type: 'item',
                    //     url: '/apps/dashboards/project'
                    // }
                ]
            },







        ]
    },

]




// ++++++++++++++++++++++++++++++++++++++++ Navigation pour administrateur +++++++++++++++++++++++++++++


export const navigation_administrateur: FuseNavigation[] = [
    {
        id: 'perminssion',
        title: 'Permissions',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'users',
                title: 'Utilisateurs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'people',
                url: '/apps/users'

            },



           

            {
                id: 'profile',
                title: 'Profiles',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'vpn_key',
                url: '/apps/profile'

            },

            {
                id: 'logs',
                title: 'Logs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'star_border',
                url: '/apps/logs'

            }

        ]
    },


    {
        id: 'application',
        title: 'Application',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'Demande-manager',
                title: 'Liste des demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes-manager'
            },



            {
                id: 'departements',
                title: 'Departement',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'people',
                url: '/apps/departements'

            },



            {
                id: 'departements',
                title: 'Type demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'people',
                url: '/apps/typeDemandes'

            },

        ]
    },

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [








        ]
    },

]

// +++++++++++++++++++ Navigation manager +++++++++++++++++++++++++++++++++++++++

export const navigation_manager: FuseNavigation[] = [
    {
        id: 'perminssion',
        title: 'Permissions',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'users',
                title: 'Utilisateurs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'people',
                url: '/apps/users'

            },

            {
                id: 'profile',
                title: 'Profiles',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'vpn_key',
                url: '/apps/profile'

            },

            {
                id: 'logs',
                title: 'Logs',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'star_border',
                url: '/apps/logs'

            }

        ]
    },


    {
        id: 'application',
        title: 'Application',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'Demande-manager',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes-manager'
            }

        ]
    },

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'Manager',
                        title: 'Manager',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },




                    {
                        id: 'Ressource',
                        title: 'Ressource humaine',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },







        ]
    },

]

// +++++++++++++++++++++++++++++++++++ Navigation Employe +++++++++++++++++++++++++++++++++

export const navigation_employe: FuseNavigation[] = [
    {
        id: 'perminssion',
        title: 'Permissions',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [



            // {
            //     id: 'logs',
            //     title: 'Logs',
            //     translate: 'NAV.CONTACTS',
            //     type: 'item',
            //     icon: 'star_border',
            //     url: '/apps/logs'

            // }

        ]
    },


    {
        id: 'application',
        title: 'Application',
        translate: 'NAV.PERMISSIONS',
        type: 'group',
        icon: 'apps',
        children: [

            {
                id: 'Demande',
                title: 'Effectuer une demande',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'autorenew',
                url: '/apps/demandes'
            },




        ]
    },

    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    // {
                    //     id: 'Manager',
                    //     title: 'Manager',
                    //     type: 'item',
                    //     url: '/apps/dashboards/analytics'
                    // },




                    // {
                    //     id: 'Ressource',
                    //     title: 'Ressource humaine',
                    //     type: 'item',
                    //     url: '/apps/dashboards/project'
                    // }
                ]
            },







        ]
    },

]



