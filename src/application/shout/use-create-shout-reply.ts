import {
  CreateReplyParams as CreateReplyServiceParams,
  createReply,
} from "@/services/shout";
import { useMutation } from "@tanstack/react-query";
import { CreateShoutParams, useCreateShout } from "./use-create-shout";

interface CreateReplyParams extends CreateShoutParams {
  shoutId: string;
}

function useCreateShoutReplyEntity() {
  return useMutation<void, unknown, CreateReplyServiceParams>({
    mutationFn: (input) => createReply(input),
  });
}

function createShoutReplyAggregate(
  createShoutMutation: ReturnType<typeof useCreateShout>,
  createReplyMutation: ReturnType<typeof useCreateShoutReplyEntity>
) {
  const mutateAsync = async ({
    shoutId,
    ...createShoutParams
  }: CreateReplyParams) => {
    const replyId = await createShoutMutation.mutateAsync(createShoutParams);
    await createReplyMutation.mutateAsync({ shoutId, replyId });
  };
  return {
    mutateAsync,
    isLoading: createShoutMutation.isLoading || createReplyMutation.isLoading,
    isError: createShoutMutation.isError || createReplyMutation.isError,
  };
}

export function useCreateShoutReply() {
  const createReplyMutation = useCreateShoutReplyEntity();
  const createShoutMutation = useCreateShout();
  return createShoutReplyAggregate(createShoutMutation, createReplyMutation);
}
