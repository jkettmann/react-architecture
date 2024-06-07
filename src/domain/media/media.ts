export interface Image {
  id: string;
  url: string;
}

export function getImageById(images?: Image[], imageId?: string) {
  if (!imageId || !images) return;
  return images.find((i) => i.id === imageId);
}
