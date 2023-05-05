import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    currentRole: string[] | string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService) {
    }

    ngOnInit() {
        console.log("menu item starts");
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Property',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['property'],
                        // items: [
                        //     { label: 'Buy', icon: 'pi pi-fw pi-home', routerLink: ['property/buy'] },
                        //     { label: 'Rent', icon: 'pi pi-fw pi-home', routerLink: ['property/rent'] },
                        // ]
                    },
                    // { label: 'Rent', icon: 'pi pi-fw pi-home', routerLink: ['/property/rent'] },
                    // {label: 'List Property (Free)', icon: 'pi pi-fw pi-home', routerLink: ['/add-property']},
                ]
            },
            {
                label: 'Admin Panel',
                items: [
                    { label: 'Role Management', icon: 'fa-solid fa-people-roof', routerLink: ['admin/role'], isShowForThisRole: this.isShowForThisRole(['Admin']) },
                ],
                isShowForThisRole: this.isShowForThisRole(['Admin'])
            },
            {
                label: 'User Area',
                items: [
                    { label: 'My Property', icon: 'pi pi-fw pi-home', routerLink: ['user/property/my-property'], isShowForThisRole: this.isShowForThisRole(['User']) },
                ],
                isShowForThisRole: this.isShowForThisRole(['User'])
            }
            //#region commented
            // {
            //     label: 'UI Components',
            //     items: [
            //         {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
            //         {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
            //         {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
            //         {
            //             label: 'Invalid State',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/uikit/invalidstate']
            //         },
            //         {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
            //         {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
            //         {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
            //         {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
            //         {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
            //         {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
            //         {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
            //         {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true},
            //         {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
            //         {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
            //         {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
            //         {label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc']}
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW'},
            //         {
            //             label: 'All Blocks',
            //             icon: 'pi pi-fw pi-globe',
            //             url: ['https://www.primefaces.org/primeblocks-ng'],
            //             target: '_blank'
            //         },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons']},
            //         {
            //             label: 'PrimeFlex',
            //             icon: 'pi pi-fw pi-desktop',
            //             url: ['https://www.primefaces.org/primeflex/'],
            //             target: '_blank'
            //         },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     routerLink: ['/pages'],
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
            //                         {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
            //                         {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
            //                         {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source',
            //             icon: 'pi pi-fw pi-search',
            //             url: ['https://github.com/primefaces/sakai-ng'],
            //             target: '_blank'
            //         }
            //     ]
            // }
            //#endregion commented
        ];
        console.log(this.model);
    }

    private isShowForThisRole(permittedRoleList: string[]) {
        this.currentRole = this.authService.userRoleList;
        if (this.currentRole && permittedRoleList && Array.isArray(permittedRoleList)) {
            if (Array.isArray(this.currentRole)) {
                if (this.currentRole.length > 0 && permittedRoleList.length > 0) {
                    return this.currentRole.some(role => permittedRoleList.includes(role));
                }
            } else {
                return permittedRoleList.includes(this.currentRole);
            }
        }
        return false;
    }
}
