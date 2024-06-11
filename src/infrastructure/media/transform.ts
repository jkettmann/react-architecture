import { Image } from "@/domain/media";

import { ImageDto } from "./dto";

export function dtoToImage(dto: ImageDto): Image {
  return {
    id: dto.id,
    url: dto.attributes.url,
  };
}
