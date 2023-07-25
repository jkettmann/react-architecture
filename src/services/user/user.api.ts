import { apiClient } from "@/ui/api-client";

async function getUser(handle: string) {
  const res = await apiClient<{
    data: User;
  }>(`/user/${handle}`);
  return res.data;
}
