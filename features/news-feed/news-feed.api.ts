import type { ApiResponse } from "~/types/api";
import type { NewsFeed } from "./news-feed.types";

// * News Feed API Service
export const useNewsFeedApi = () => {
  const { $api } = useNuxtApp();
  const base = "/news-feed";

  return {
    list: (p: any) => $api.post<ApiResponse<NewsFeed[]>>(`${base}/list`, p),
    create: (d: any) => $api.post(`${base}/create`, d),
    update: (id: number, d: any) => $api.post(`${base}/update/${id}`, d),
    remove: (id: number) => $api.post(`${base}/delete/${id}`),
    toggleStatus: (id: number, s: boolean) => $api.post(`${base}/status/${id}`, { status: s }),
  };
};
