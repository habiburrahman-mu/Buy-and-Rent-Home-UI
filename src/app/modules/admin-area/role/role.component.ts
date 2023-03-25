import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { RoleDto } from 'src/app/models/roleDto';
import { RoleService } from 'src/app/services/http/role.service';
import { RoleHomeComponent } from '../role-home/role-home.component';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {

    roleList: RoleDto[] = [];

    isDataLoading = false;

    private ngUnsubscribed = new Subject<void>();

    constructor(
        private roleService: RoleService,
        private roleHomeComponent: RoleHomeComponent
    ) { }

    ngOnInit(): void {
    }

    loadRoleList(event: LazyLoadEvent){
        console.log(event);
        this.isDataLoading = true;
        // let paginationParams: PaginationParameter = {
        //     currentPageNo: Math.ceil(event.first!/event.rows!) + 1,
        //     pageSize: event.rows!,
        //     sortBy: '',
        //     isDescending: false,
        //     searchField: '',
        //     searchingText: ''
        // };

        this.roleService.getRoleList()
            .pipe(takeUntil(this.ngUnsubscribed))
            .subscribe({
                next: response => {
                    this.isDataLoading = false;
                    this.roleList = response;
                    this.roleHomeComponent.roleList = response;
                },
                error: (err: HttpErrorResponse) => {
                    this.isDataLoading = false;
                }
            });

    }

    ngOnDestroy(): void {
        this.ngUnsubscribed.next();
        this.ngUnsubscribed.complete();
    }

}
