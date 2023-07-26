import { User } from "@/domain/user";
import { GetUserApi, GetUserParams, UserDto } from "./user.interfaces";

export function dtoToEntity(dto: UserDto): User {
  return {
    id: dto.id,
    type: dto.type,
    handle: dto.attributes.handle,
    avatar: dto.attributes.avatar,
    info: dto.attributes.info,
  };
}

export async function getUser(
  api: GetUserApi,
  params: GetUserParams
): Promise<User> {
  const dto = await api(params);
  return dtoToEntity(dto.data);
}
