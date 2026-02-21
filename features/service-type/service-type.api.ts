import type { ApiResponse } from "~/types/api";
import type { ServiceType } from "./service-type.types";

// * Service Type API Service
export const useServiceTypeApi = () => {
  const { $api } = useNuxtApp();
  const base = "/service-type";

  return {
    list: (params: any) => $api.post<ApiResponse<ServiceType[]>>(`${base}/list`, params),
    create: (data: any) => $api.post(`${base}/create`, data),
    update: (id: number, data: any) => $api.post(`${base}/update/${id}`, data),
    remove: (id: number) => $api.post(`${base}/delete/${id}`),
    toggleStatus: (id: number, status: boolean) => $api.post(`${base}/status/${id}`, { status }),
  };
};
