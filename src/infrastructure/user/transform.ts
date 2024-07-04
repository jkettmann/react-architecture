import { Me } from "@/domain/me";
import { User } from "@/domain/user";

import { MeDto, UserDto } from "./dto";

export function dtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    avatar: dto.attributes.avatar,
    handle: dto.attributes.handle,
    info: dto.attributes.info,
    blockedUserIds: dto.attributes.blockedUserIds,
    followerIds: dto.relationships.followerIds,
  };
}

export function dtoToMe(dto?: MeDto): Me | null {
  if (!dto) {
    return null;
  }

  return {
    ...dtoToUser(dto),
    numShoutsPastDay: dto.attributes.numShoutsPastDay,
  };
}
