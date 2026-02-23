import { type CustomerTypeFormInput } from "~/utils/shared/schemas";
import type { CustomerType } from "~/utils/types";
import { useCustomerTypeApi } from "./customer-type.api";

// * Customer Type Logic
export const useCustomerType = () => {
  const api = useCustomerTypeApi(),
    items = ref<CustomerType[]>([]),
    total = ref(0);
  const page = ref(0),
    rowsPerPage = ref(10),
    search = ref("");

  const { data, status, refresh } = useAsyncData(
    "customer-types",
    () =>
      api.list({
        page: page.value + 1,
        rowsPerPage: rowsPerPage.value,
        searchText: search.value,
      }),
    { watch: [page, rowsPerPage, search] },
  );

  watch(
    data,
    (v) => {
      if (v?.body) {
        items.value = v.body.data || [];
        total.value = v.body.pagination?.total || 0;
      }
    },
    { immediate: true },
  );

  const create = async (v: CustomerTypeFormInput) => {
    await api.create(v);
    refresh();
  };
  const update = async (id: number, v: CustomerTypeFormInput) => {
    await api.update(id, v);
    refresh();
  };
  const remove = async (id: number) => {
    await api.remove(id);
    refresh();
  };
  const toggle = async (id: number, s: boolean) => {
    await api.toggleStatus(id, s);
    refresh();
  };

  return { items, total, page, rowsPerPage, search, refresh, create, update, remove, toggle, isLoading: computed(() => status.value === "pending") };
};
