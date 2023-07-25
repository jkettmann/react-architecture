import { Image, ImageId } from "@/domain/image";
import {
  CreateImageApi,
  CreateImageParams,
  ImageDto,
} from "./image.interfaces";

export function dtoToEntity(dto: ImageDto): Image {
  return {
    id: dto.id,
    type: dto.type,
    url: dto.attributes.url,
  };
}

export async function createImage(
  api: CreateImageApi,
  params: CreateImageParams
): Promise<ImageId> {
  const formData = new FormData();
  formData.append("image", params.file);
  const res = await api(formData);
  return res.data.id;
}
