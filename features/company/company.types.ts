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
