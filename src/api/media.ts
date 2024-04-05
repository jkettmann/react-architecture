import { Image } from "@/types";

import { apiClient } from "./client";

async function uploadImage(formData: FormData) {
  const response = await apiClient.post<{ data: Image }>("/image", formData);
  const image = response.data.data;
  return image;
}

export default { uploadImage };
