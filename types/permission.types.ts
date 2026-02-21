// types/permission.types.ts

export interface Module {
  id: number;
  name: string;
  type: string;
  checked: boolean;
}

export interface ModuleType {
  id: number;
  name: string;
  nameOther: string;
  moduleList: Module[];
}

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  createdBy: string;
  modifiedBy: string;
  moduleTypeList: ModuleType[];
}
