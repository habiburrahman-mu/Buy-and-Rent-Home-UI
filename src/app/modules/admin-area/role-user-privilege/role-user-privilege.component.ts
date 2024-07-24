import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { PaginationParameter } from 'src/app/models/PaginationParameter';
import { RoleDto } from 'src/app/models/roleDto';
import { UserDto } from 'src/app/models/userDto';
import { UserPrivilege } from 'src/app/models/userPrivilege';
import { UserPrivilegeSaveDto } from 'src/app/models/userPrivilegeSaveDto';
import { UserPrivilegeService } from 'src/app/services/http/user-privilege.service';
import { UserService } from 'src/app/services/http/user.service';
import { Mapper } from 'src/app/utils/mapper';

@Component({
	selector: 'app-role-user-privilege',
	templateUrl: './role-user-privilege.component.html',
	styleUrls: ['./role-user-privilege.component.css']
})
export class RoleUserPrivilegeComponent implements OnInit, OnDestroy {
	@Input() roleList: RoleDto[] = [];
	@ViewChild('pTable', { static: true }) pTable: Table;

	private lastTableLazyLoadEvent: LazyLoadEvent;

	userDtoList: UserDtoExtended[] = [];
	totalRecords = 0;

	isDataLoading = false;

	showUserPrivilegeDialog = false;
	isSaveInProgress = false;

	selectedUserPrivilege = {
		userId: 0,
		username: "",
		roleListWithSelectState: [] as Array<RoleDtoWithSelectState>
	}

	searchingText: string = '';

	private ngUnsubscribed = new Subject<void>();

	constructor(
		private userService: UserService,
		private userPrivilegeService: UserPrivilegeService,
		private messageService: MessageService
	) { }

	ngOnInit(): void {
	}

	loadUserDtoList(event: LazyLoadEvent) {
		this.isDataLoading = true;
		this.lastTableLazyLoadEvent = event;
		let paginationParams = Mapper.pTableLazyLoadEventToPaginationParameter(event);
		paginationParams.searchField = 'username';
		paginationParams.searchingText = this.searchingText;
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
		this.isSaveInProgress = true;
		let userPrivilegeSaveDto: UserPrivilegeSaveDto = {
			userId: this.selectedUserPrivilege.userId,
			userPrivilegeList: this.selectedUserPrivilege.roleListWithSelectState
				.filter(role => role.isSelected)
				.map(role => {
					let userPrivilege: UserPrivilege = {
						id: 0,
						userId: this.selectedUserPrivilege.userId,
						roleId: role.id
					}
					return userPrivilege;
				})
		}

		this.userPrivilegeService.saveUserPrivilege(userPrivilegeSaveDto)
			.pipe(takeUntil(this.ngUnsubscribed))
			.subscribe({
				next: response => {
					this.messageService.add({
						severity: 'success',
						summary: 'User Privilege',
						detail: 'User Privilege Updated'
					});
					this.loadUserDtoList(this.lastTableLazyLoadEvent);
					this.isSaveInProgress = false;
					this.showUserPrivilegeDialog = false;
				},
				error: (error: HttpErrorResponse) => {
					console.log(error);
					this.isSaveInProgress = false;
				}
			});

		console.log(userPrivilegeSaveDto);
	}

	onSearch() {
		this.pTable.reset();
	}

	ngOnDestroy(): void {
		this.ngUnsubscribed.next();
		this.ngUnsubscribed.complete();
	}
}

interface UserDtoExtended extends UserDto {
	roleList?: Array<string>
}

interface RoleDtoWithSelectState extends RoleDto {
	isSelected: boolean
}
