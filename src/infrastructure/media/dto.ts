export interface ImageDto {
  id: string;
  type: "image";
  attributes: {
    url: string;
  };
}
