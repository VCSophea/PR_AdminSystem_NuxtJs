import { api } from "~/plugins/api";
import type { ApiResponse, CustomerType } from "~/utils/types";

// * Customer Type API
export const useCustomerTypeApi = () => {
  const base = "/customer-type";
  return {
    list: (p: any) => api.post<ApiResponse<CustomerType[]>>(`${base}/list`, p).then((r) => r.data),
    create: (d: any) => api.post(`${base}/create`, d).then((r) => r.data),
    update: (id: number, d: any) => api.post(`${base}/update/${id}`, d).then((r) => r.data),
    remove: (id: number) => api.post(`${base}/delete/${id}`).then((r) => r.data),
    toggleStatus: (id: number, s: boolean) => api.post(`${base}/status/${id}`, { status: s }).then((r) => r.data),
  };
};
