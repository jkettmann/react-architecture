import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoutId } from "@/domain/shout";
import {
  CreateShoutParams as CreateShoutServiceParams,
  createShout,
} from "@/services/shout";
import { createImage } from "@/services/image";
import { ImageId } from "@/domain/image";

export interface CreateShoutParams extends CreateShoutServiceParams {
  image?: File;
}

function useCreateImage() {
  return useMutation<ImageId, unknown, File>({
    mutationFn: (file) => createImage({ file }),
  });
}

function useCreateShoutEntity() {
  const queryClient = useQueryClient();
  return useMutation<ShoutId, unknown, CreateShoutServiceParams>({
    mutationFn: (input) => createShout(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}

function createShoutAggregate(
  createImageMutation: ReturnType<typeof useCreateImage>,
  createShoutMutation: ReturnType<typeof useCreateShoutEntity>
) {
  const mutateAsync = async ({
    image,
    ...createShoutParams
  }: CreateShoutParams) => {
    let imageId;
    if (image) {
      imageId = await createImageMutation.mutateAsync(image);
    }
    const shoutId = await createShoutMutation.mutateAsync({
      ...createShoutParams,
      imageId,
    });
    return shoutId;
  };
  return {
    mutateAsync,
    isLoading: createImageMutation.isLoading || createShoutMutation.isLoading,
    isError: createImageMutation.isError || createShoutMutation.isError,
  };
}

export function useCreateShout() {
  const createImageMutation = useCreateImage();
  const createShoutMutation = useCreateShoutEntity();
  return createShoutAggregate(createImageMutation, createShoutMutation);
}
