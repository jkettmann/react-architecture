import { useMutation } from "@tanstack/react-query";

import MediaService from "@/infrastructure/media";

export function useSaveImage() {
  return useMutation({
    mutationFn: (file: File) => MediaService.saveImage(file),
  });
}
