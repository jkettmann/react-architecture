import { Me, User } from "@/domain";

import { MeDto, UserDto } from "./dto";

export function dtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    avatar: dto.attributes.avatar,
    handle: dto.attributes.handle,
    info: dto.attributes.info,
    followerIds: dto.relationships.followerIds,
  };
}

export function dtoToMe(dto: MeDto): Me {
  return dtoToUser(dto);
}