import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/ui/api-client";
import { Image } from "@/ui/types";

async function uploadImage(formData: FormData) {
  const res = await apiClient.post<{ data: Image }>(`/image`, formData);
  return res.data;
}

export function useUploadImage() {
  const mutation = useMutation<{ data: Image }, unknown, FormData>({
    mutationFn: (formData) => uploadImage(formData),
  });
  return mutation;
}
