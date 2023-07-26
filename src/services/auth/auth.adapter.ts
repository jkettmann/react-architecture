import { Me } from "@/domain/me";
import { dtoToEntity as userDtoToEntity } from "@/services/user/user.adapter";
import { GetMeApi, LoginApi, LoginParams, MeDto } from "./auth.interfaces";

export async function login(api: LoginApi, { handle, password }: LoginParams) {
  await api({ username: handle, password });
}

function dtoToEntity(dto: MeDto): Me {
  return {
    ...userDtoToEntity(dto),
    followerIds: dto.relationships.followerIds,
  };
}

export async function getMe(api: GetMeApi) {
  const res = await api();
  return dtoToEntity(res.data);
}
