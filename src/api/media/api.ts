import { apiClient } from "../client";

import { ImageDto } from "./dto";
import { dtoToImage } from "./transform";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post<{ data: ImageDto }>("/image", formData);
  const image = response.data.data;
  return dtoToImage(image);
}

export default { uploadImage };
