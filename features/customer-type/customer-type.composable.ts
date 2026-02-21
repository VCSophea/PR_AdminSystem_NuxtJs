import { useCustomerTypeApi } from "./customer-type.api";
import type { CustomerTypeFormInput } from "./customer-type.schema";
import type { CustomerType } from "./customer-type.types";

// * Customer Type Composable
export const useCustomerType = () => {
  const api = useCustomerTypeApi();
  const list = ref<CustomerType[]>([]);
  const total = ref(0);
  const page = ref(0);
  const rowsPerPage = ref(10);
  const searchText = ref("");

  const { data, status, refresh } = useAsyncData(
    "customer-types",
    () =>
      api.list({
        page: page.value + 1,
        rowsPerPage: rowsPerPage.value,
        searchText: searchText.value,
      }),
    { watch: [page, rowsPerPage, searchText] },
  );

  watch(
    data,
    (v) => {
      if (v?.body) {
        list.value = v.body.data || [];
        total.value = v.body.pagination?.total || 0;
      }
    },
    { immediate: true },
  );

  const fetch = () => refresh();
  const create = async (v: CustomerTypeFormInput) => {
    await api.create(v);
    await fetch();
  };
  const update = async (id: number, v: CustomerTypeFormInput) => {
    await api.update(id, v);
    await fetch();
  };
  const remove = async (id: number) => {
    await api.remove(id);
    await fetch();
  };
  const toggle = async (id: number, s: boolean) => {
    await api.toggleStatus(id, s);
    await fetch();
  };

  return {
    list,
    total,
    page,
    rowsPerPage,
    searchText,
    fetch,
    create,
    update,
    remove,
    toggle,
    isLoading: computed(() => status.value === "pending"),
  };
};
