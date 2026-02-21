import { useServiceTypeApi } from "./service-type.api";
import type { ServiceTypeFormInput } from "./service-type.schema";
import type { ServiceType } from "./service-type.types";

// * Service Type Composable
export const useServiceType = () => {
  const api = useServiceTypeApi();
  const list = ref<ServiceType[]>([]);
  const total = ref(0);
  const page = ref(0);
  const rowsPerPage = ref(10);
  const searchText = ref("");

  const { data, status, refresh } = useAsyncData(
    "service-types",
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
  const create = async (v: ServiceTypeFormInput) => {
    await api.create(v);
    await fetch();
  };
  const update = async (id: number, v: ServiceTypeFormInput) => {
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
