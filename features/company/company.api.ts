import { api } from "~/plugins/api";
import type { ApiResponse, Company, CompanyFilter } from "~/utils/types";

export function useCompanyApi() {
  return {
    // * API Interactions
    list: (f: CompanyFilter) => api.post<ApiResponse<Company[]>>("/companies/list", f).then((r) => r.data),
    create: (v: any) => api.post<ApiResponse<Company[]>>("/companies/add", v).then((r) => r.data),
    find: (id: number) => api.post<ApiResponse<Company[]>>(`/companies/find/${id}`).then((r) => r.data),
    remove: (id: number) => api.post(`/companies/delete/${id}`).then((r) => r.data),
    toggleStatus: (id: number, status: boolean) => api.post(`/companies/status/${id}`, { status }).then((r) => r.data),
  };
}
