import { Component, Input, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { RoleDto } from 'src/app/models/roleDto';
import { UserDto } from 'src/app/models/userDto';
import { UserPrivilegeDto } from 'src/app/models/userPrivilegeDto';
import { UserService } from 'src/app/services/http/user.service';
import { Mapper } from 'src/app/utils/mapper';

@Component({
    selector: 'app-role-user-privilege',
    templateUrl: './role-user-privilege.component.html',
    styleUrls: ['./role-user-privilege.component.css']
})
export class RoleUserPrivilegeComponent implements OnInit {
    @Input() roleList: RoleDto[] = [];

    userDtoList: UserDtoExtended[] = [];
    totalRecords = 0;

    isDataLoading = false;

    showUserPrivilegeDialog = false;

    selectedUserPrivilege = {
        userId: 0,
        username: "",
        roleListWithSelectState: [] as Array<RoleDtoWithSelectState>
    }

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
            });
    }

    onShowUserPrivilegeDialog(user: UserDto) {
        let roleIdListForSelectedUser = user.userPrivileges.map(privilege => {
            return privilege.roleId;
        });
        this.selectedUserPrivilege = {
            userId: user.id,
            username: user.username,
            roleListWithSelectState: this.roleList.map(role => {
                return {
                    ...role,
                    isSelected: roleIdListForSelectedUser
                        .find(roleId => roleId === role.id) !== undefined
                }
            })
        };
        this.showUserPrivilegeDialog = true
    }

    onSubmit() {
        console.log(this.selectedUserPrivilege);
    }
}

interface UserDtoExtended extends UserDto {
    roleList?: Array<string>
}

interface RoleDtoWithSelectState extends RoleDto {
    isSelected: boolean
}
