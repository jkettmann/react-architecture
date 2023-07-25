import { ShoutId } from "@/domain/shout";
import { CreateShoutApi, CreateShoutParams } from "./shout.interfaces";

export async function createShout(
  api: CreateShoutApi,
  params: CreateShoutParams
): Promise<ShoutId> {
  const dto = await api(params);
  return dto.data.id;
}
