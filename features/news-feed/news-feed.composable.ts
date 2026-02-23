import type { NewsFeed } from "~/types";
import { type NewsFeedFormInput } from "~/utils/shared/schemas";
import { useNewsFeedApi } from "./news-feed.api";

// * News Feed Logic
export const useNewsFeed = () => {
  const api = useNewsFeedApi(),
    items = ref<NewsFeed[]>([]),
    total = ref(0);
  const page = ref(0),
    rowsPerPage = ref(10),
    search = ref("");

  const { data, status, refresh } = useAsyncData(
    "news-feeds",
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

  const create = async (v: NewsFeedFormInput) => {
    await api.create(v);
    refresh();
  };
  const update = async (id: number, v: NewsFeedFormInput) => {
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
