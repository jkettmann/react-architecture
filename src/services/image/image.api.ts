import { apiClient } from "@/services/api-client";
import { CreateImageApi, ImageDto } from "./image.interfaces";

export const createImage: CreateImageApi = async (formData) => {
  const res = await apiClient.post<{ data: ImageDto }>(`/image`, formData);
  return res.data;
};
