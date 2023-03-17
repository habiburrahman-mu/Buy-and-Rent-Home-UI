import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PaginationParameter } from 'src/app/models/PaginationParameter';
import { RoleDto } from 'src/app/models/roleDto';
import { RoleService } from 'src/app/services/role.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {

    roleList: RoleDto[] = [];
    totalRecords = 0;

    isDataLoading = false;

    showRoleSaveDialog = false;

    private ngUnsubscribed = new Subject<void>();

    constructor(
        private roleService: RoleService
    ) { }

    ngOnInit(): void {
    }

    loadRoleList(event: LazyLoadEvent){
        console.log(event);
        this.isDataLoading = true;
        let paginationParams: PaginationParameter = {
            currentPageNo: Math.ceil(event.first!/event.rows!) + 1,
            pageSize: event.rows!,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        };

        this.roleService.getRolePaginatedList(paginationParams)
            .pipe(takeUntil(this.ngUnsubscribed))
            .subscribe({
                next: response => {
                    this.isDataLoading = false;
                    this.roleList = response.resultList;
                    this.totalRecords = response.totalRecords;
                    console.log(this.roleList);
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
