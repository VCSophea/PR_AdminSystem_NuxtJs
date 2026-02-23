import { api } from "~/plugins/api";
import type { ApiResponse, ServiceType } from "~/utils/types";

// * Service Type API
export const useServiceTypeApi = () => {
  const base = "/service-type";
  return {
    list: (p: any) => api.post<ApiResponse<ServiceType[]>>(`${base}/list`, p).then((r) => r.data),
    create: (d: any) => api.post(`${base}/create`, d).then((r) => r.data),
    update: (id: number, d: any) => api.post(`${base}/update/${id}`, d).then((r) => r.data),
    remove: (id: number) => api.post(`${base}/delete/${id}`).then((r) => r.data),
    toggleStatus: (id: number, s: boolean) => api.post(`${base}/status/${id}`, { status: s }).then((r) => r.data),
  };
};
