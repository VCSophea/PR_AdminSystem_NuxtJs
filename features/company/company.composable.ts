import { type CompanyFormInput } from "~/utils/shared/schemas";
import type { Company } from "~/utils/types";
import { useCompanyApi } from "./company.api";

// * Company Logic
export const useCompany = () => {
  const api = useCompanyApi();
  const companies = ref<Company[]>([]);
  const totalCount = ref(0);
  const page = ref(0),
    rowsPerPage = ref(10),
    searchText = ref("");

  // * Async Data Pulse
  const { data, status, refresh } = useAsyncData(
    "companies",
    () =>
      api.list({
        page: page.value + 1,
        rowsPerPage: rowsPerPage.value,
        searchText: searchText.value,
      }),
    { watch: [page, rowsPerPage, searchText] },
  );

  // * Sync State
  watch(
    data,
    (v) => {
      if (v?.body) {
        companies.value = v.body.data || [];
        totalCount.value = v.body.pagination?.total || 0;
      }
    },
    { immediate: true },
  );

  const create = async (v: CompanyFormInput) => {
    const fd = new FormData();
    Object.entries(v).forEach(([k, val]) => {
      if (val !== undefined) fd.append(k, val as any);
    });
    await api.create(fd);
    await refresh();
  };
  const remove = async (id: number) => {
    await api.remove(id);
    await refresh();
  };
  const toggleStatus = async (id: number, s: boolean) => {
    await api.toggleStatus(id, s);
    await refresh();
  };

  return { companies, totalCount, page, rowsPerPage, searchText, refresh, create, remove, toggleStatus, isLoading: computed(() => status.value === "pending") };
};
