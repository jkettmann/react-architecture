import { Image } from "@/types";

import { apiClient } from "./client";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post<{ data: Image }>("/image", formData);
  const image = response.data.data;
  return image;
}

export default { uploadImage };
