export const getImageUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("blob:") || path.startsWith("http")) return path;
  const config = useRuntimeConfig();
  return `${config.public.apiBase || ""}${path}`;
};
