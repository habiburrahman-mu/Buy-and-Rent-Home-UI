import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "role" },
    { path: "role", component: RoleComponent },
];

@NgModule({
    declarations: [
        RoleComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminAreaModule { }
