// features/company/api/company.api.ts
import { useApi } from "~/composables/useApi";
import type { ApiResponse } from "~/types/api.types";
import type { Company } from "../types";

export function useCompanyApi() {
  const { api } = useApi();

  return {
    getAll: (params?: { search?: string; page?: number }) => api.get<ApiResponse<Company[]>>("/companies", { params }).then((r) => r.data),

    create: (data: FormData) =>
      api
        .post<ApiResponse<Company>>("/companies", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((r) => r.data),

    update: (id: number, data: FormData) =>
      api
        .put<ApiResponse<Company>>(`/companies/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((r) => r.data),

    remove: (id: number) => api.delete(`/companies/${id}`).then((r) => r.data),

    toggleStatus: (id: number, status: boolean) => api.patch(`/companies/${id}/status`, { status }).then((r) => r.data),
  };
}
