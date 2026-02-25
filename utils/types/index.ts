// types/index.ts

// * Global API Response Shape
export interface ApiResponse<T = any> {
  header: { serverTimestamp: number; result: boolean; statusCode: number | string };
  body: { status: boolean; message: string; data: T; pagination?: { page: number; rowsPerPage: number; total: number } };
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
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  createdBy: string;
  modifiedBy: string;
  moduleTypeList: ModuleType[];
}

export interface UserProfile {
  id: string | number;
  username: string;
  fullName?: string;
  email?: string;
  roles?: string[];
  [key: string]: any;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginApiResponse {
  header: { serverTimestamp: number; result: boolean; statusCode: number | string };
  body: LoginResponse;
}

export interface ProfileApiResponse {
  header: { serverTimestamp: number; result: boolean; statusCode: number | string };
  body: AuthUser;
}

// * Company Definition
export interface Company {
  id: number;
  name: string;
  description?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  isActive: number | boolean;
  logo?: string;
  createdBy: string;
  modifiedBy: string;
  created: string;
  modified: string;
}

export interface CompanyFilter {
  page: number;
  rowsPerPage: number;
  orderBy?: string;
  searchText?: string;
  zoneId?: number;
}

// * Service Type Definition
export interface ServiceType {
  id: number;
  name: string;
  nameOther?: string;
  description?: string;
  isActive: boolean;
  created?: string;
}

// * Customer Type Definition
export interface CustomerType {
  id: number;
  name: string;
  nameOther?: string;
  description?: string;
  isActive: boolean;
  created?: string;
}

// * News Feed Definition
export interface NewsFeed {
  id: number;
  title: string;
  content: string;
  author?: string;
  image?: string;
  isActive: boolean;
  created?: string;
}
