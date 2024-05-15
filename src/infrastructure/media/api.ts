import { apiClient } from "../client";

import { ImageDto } from "./dto";

async function uploadImage(formData: FormData) {
  const response = await apiClient.post<{ data: ImageDto }>("/image", formData);
  return response.data;
}

export default { uploadImage };
