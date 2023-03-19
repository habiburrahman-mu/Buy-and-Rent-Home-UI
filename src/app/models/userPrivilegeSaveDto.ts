import { UserPrivilege } from "./userPrivilege";

export interface UserPrivilegeSaveDto {
    userId: number;
    userPrivilegeList: UserPrivilege[];
  }
