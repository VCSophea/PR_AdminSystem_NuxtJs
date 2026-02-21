// features/company/composables/useCompany.ts
import { ref } from "vue";
import { useCompanyApi } from "../api/company.api";
import type { CompanyFormInput } from "../schemas/company.schema";
import type { Company } from "../types";

export function useCompany() {
  const companyApi = useCompanyApi();

  const companies = ref<Company[]>([]);
  const isLoading = ref(false);
  const search = ref("");

  const fetchAll = async () => {
    isLoading.value = true;
    try {
      const res = await companyApi.getAll({ search: search.value });
      companies.value = res.body;
    } catch {
      console.error("Failed to fetch companies");
    } finally {
      isLoading.value = false;
    }
  };

  const create = async (data: CompanyFormInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined) formData.append(key, val as any);
    });
    await companyApi.create(formData);
    await fetchAll();
  };

  const remove = async (id: number) => {
    await companyApi.remove(id);
    await fetchAll();
  };

  const toggleStatus = async (id: number, status: boolean) => {
    await companyApi.toggleStatus(id, status);
    await fetchAll();
  };

  return {
    companies,
    isLoading,
    search,
    fetchAll,
    create,
    remove,
    toggleStatus,
  };
}
