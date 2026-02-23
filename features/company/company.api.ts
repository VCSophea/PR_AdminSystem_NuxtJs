import { api } from "~/plugins/api";
import type { ApiResponse, Company, CompanyFilter } from "~/types";

export function useCompanyApi() {
  return {
    list: (filter: CompanyFilter) => api.post<ApiResponse<Company[]>>("/companies/list", filter).then((r) => r.data),

    create: (data: FormData) =>
      api
        .post<ApiResponse<Company[]>>("/companies/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((r) => r.data),

    find: (id: number) => api.post<ApiResponse<Company[]>>(`/companies/find/${id}`).then((r) => r.data),

    remove: (id: number) => api.post(`/companies/delete/${id}`).then((r) => r.data),

    toggleStatus: (id: number, status: boolean) => api.post(`/companies/status/${id}`, { status }).then((r) => r.data),
  };
}
