import { User } from "@/domain/user";
import { GetUserApi, GetUserDto, GetUserParams } from "./user.interfaces";

export function dtoToEntity(dto: GetUserDto): User {
  return {
    id: dto.data.id,
    type: dto.data.type,
    handle: dto.data.attributes.handle,
    avatar: dto.data.attributes.avatar,
    info: dto.data.attributes.info,
  };
}

export async function getUser(
  api: GetUserApi,
  params: GetUserParams
): Promise<User> {
  const dto = await api(params);
  return dtoToEntity(dto);
}
