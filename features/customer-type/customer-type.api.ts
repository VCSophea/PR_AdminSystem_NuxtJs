import type { ApiResponse } from "~/types/api";
import type { CustomerType } from "./customer-type.types";

// * Customer Type API Service
export const useCustomerTypeApi = () => {
  const { $api } = useNuxtApp();
  const base = "/customer-type";

  return {
    list: (p: any) => $api.post<ApiResponse<CustomerType[]>>(`${base}/list`, p),
    create: (d: any) => $api.post(`${base}/create`, d),
    update: (id: number, d: any) => $api.post(`${base}/update/${id}`, d),
    remove: (id: number) => $api.post(`${base}/delete/${id}`),
    toggleStatus: (id: number, s: boolean) => $api.post(`${base}/status/${id}`, { status: s }),
  };
};
