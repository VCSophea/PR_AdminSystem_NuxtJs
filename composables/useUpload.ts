import { api } from "~/plugins/api";

export const useUpload = () => {
  const isUploading = ref(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    isUploading.value = true;
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/file/upload-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.body?.status) {
        return res.data.body.message; // * short url path
      }
      return null;
    } catch (error) {
      console.error("File upload failed:", error);
      return null;
    } finally {
      isUploading.value = false;
    }
  };

  return { uploadFile, isUploading };
};
