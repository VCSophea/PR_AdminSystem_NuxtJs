// types/index.ts

// * Global API Response Shape
export interface ApiResponse<T = any> {
  header: {
    serverTimestamp: number;
    result: boolean;
    statusCode: number | string;
  };
  body: {
    status: boolean;
    message: string;
    data: T;
    pagination?: {
      page: number;
      rowsPerPage: number;
      total: number;
    };
  };
}

// * Permission & User Types
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
  isSuperAdmin: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  createdBy: string;
  modifiedBy: string;
  moduleTypeList: ModuleType[];
}
