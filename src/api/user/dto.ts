import { ImageDto } from "../media/dto";
import { ShoutDto } from "../shout/dto";

export interface UserDto {
  id: string;
  type: "user";
  attributes: {
    handle: string;
    avatar: string;
    info?: string;
  };
}

export interface MeDto extends UserDto {
  relationships: {
    followerIds: string[];
  };
}

export interface UserShoutsResponse {
  data: ShoutDto[];
  included: ImageDto[];
}
