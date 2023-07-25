import { ImageId } from "@/domain/image";

export interface ImageDto {
  id: ImageId;
  type: "image";
  attributes: {
    url: string;
  };
}

export interface CreateImageParams {
  file: File;
}

export interface CreateImageDto {
  data: ImageDto;
}

export type CreateImageApi = (formData: FormData) => Promise<CreateImageDto>;
