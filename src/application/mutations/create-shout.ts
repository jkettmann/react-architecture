import { useMutation } from "@tanstack/react-query";

import ShoutService from "@/infrastructure/shout";

interface CreateShoutInput {
  message: string;
  imageId?: string;
}

export function useCreateShout() {
  return useMutation({
    mutationFn: (input: CreateShoutInput) => ShoutService.createShout(input),
  });
}
