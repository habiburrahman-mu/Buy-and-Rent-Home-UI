import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { UserDto } from 'src/app/models/userDto';
import { UserService } from 'src/app/services/user.service';
import { Mapper } from 'src/app/utils/mapper';

@Component({
    selector: 'app-role-user-privilege',
    templateUrl: './role-user-privilege.component.html',
    styleUrls: ['./role-user-privilege.component.css']
})
export class RoleUserPrivilegeComponent implements OnInit {

    userDtoList: UserDtoExtended[] = [];
    totalRecords = 0;

    isDataLoading = false;

    showUserPrivilegeDialog = false;

    private ngUnsubscribed = new Subject<void>();

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
    }

    loadUserDtoList(event: LazyLoadEvent) {
        this.isDataLoading = true;
        let paginationParams = Mapper.pTableLazyLoadEventToPaginationParameter(event);
        this.userService.getUserPaginatedList(paginationParams)
            .pipe(takeUntil(this.ngUnsubscribed))
            .subscribe({
                next: response => {
                    this.isDataLoading = false;
                    this.userDtoList = response.resultList;
                    this.totalRecords = response.totalRecords;
                    this.userDtoList = this.userDtoList.map(userDto => {
                        return {
                            ...userDto,
                            roleList: userDto.userPrivileges.map(privilege => {
                                return privilege.roleName;
                            })
                        }
                    });
                    this.isDataLoading = false;
                    // console.log(this.userDtoList);
                },
                error: error => {
                    this.isDataLoading = false;
                    console.log(error);
                }
            })
    }

}

interface UserDtoExtended extends UserDto {
    roleList?: Array<string>
}
