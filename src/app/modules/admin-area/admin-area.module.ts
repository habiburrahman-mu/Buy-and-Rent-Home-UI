import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RoleHomeComponent } from './role-home/role-home.component';
import { RoleUserPrivilegeComponent } from './role-user-privilege/role-user-privilege.component';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "role" },
    { path: "role", component: RoleHomeComponent },
];

@NgModule({
    declarations: [
        RoleComponent,
        RoleHomeComponent,
        RoleUserPrivilegeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminAreaModule { }
