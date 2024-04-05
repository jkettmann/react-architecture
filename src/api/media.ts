import { apiClient } from "./client";
import { ImageDto } from "./dtos";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post<{ data: ImageDto }>("/image", formData);
  const image = response.data.data;
  return image;
}

export default { uploadImage };
