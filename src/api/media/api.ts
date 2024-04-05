import { apiClient } from "../client";

import { ImageDto } from "./dto";
import { dtoToImage } from "./transform";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiClient.post<{ data: ImageDto }>("/image", formData);
  const imageDto = response.data.data;
  return dtoToImage(imageDto);
}

export default { uploadImage };
