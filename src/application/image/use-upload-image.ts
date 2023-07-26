import { useMutation } from "@tanstack/react-query";
import { createImage } from "@/services/image";
import { ImageId } from "@/domain/image";

export function useUploadImage() {
  const mutation = useMutation<ImageId, unknown, File>({
    mutationFn: (file) => createImage({ file }),
  });
  return mutation;
}
