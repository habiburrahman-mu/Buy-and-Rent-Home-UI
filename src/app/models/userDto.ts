import { UserPrivilegeDto } from "./userPrivilegeDto";

export interface UserDto {
	id: number;
	username: string;
	userPrivileges: UserPrivilegeDto[];
}
