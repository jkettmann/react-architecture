export type ImageId = Flavor<string, "ImageId">;

export interface Image {
  id: ImageId;
  type: "image";
  url: string;
}
