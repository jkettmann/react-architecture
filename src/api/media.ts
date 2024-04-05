import { Image } from "@/types";

import { apiClient } from "./client";

async function uploadImage(formData: FormData) {
  const response = await apiClient.post<{ data: Image }>("/image", formData);
  return response.data;
}

export default { uploadImage };
