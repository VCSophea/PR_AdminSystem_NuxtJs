import { type CompanyFormInput } from "~/utils/shared/schemas";
import type { Company } from "~/utils/types";
import { useCompanyApi } from "./company.api";

export const useCompany = () => {
  const api = useCompanyApi();
  const companies = ref<Company[]>([]);
  const totalCount = ref(0);
  const page = ref(0),
    rowsPerPage = ref(10),
    searchText = ref("");

  // * Data Fetching
  const q = computed(() => ({ page: page.value + 1, rowsPerPage: rowsPerPage.value, searchText: searchText.value }));
  const { data, status, refresh } = useAsyncData("companies", () => api.list(q.value), { watch: [q] });

  // * State Sync
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

  // * Actions
  const create = async (v: CompanyFormInput) => (await api.create(v), refresh());
  const remove = async (id: number) => (await api.remove(id), refresh());
  const toggleStatus = async (id: number, s: boolean) => (await api.toggleStatus(id, s), refresh());

  return { companies, totalCount, page, rowsPerPage, searchText, refresh, create, remove, toggleStatus, isLoading: computed(() => status.value === "pending") };
};
