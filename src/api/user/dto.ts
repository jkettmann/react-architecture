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
  relationships: {
    followerIds: string[];
  };
}

export interface MeDto extends UserDto {}

export interface UserShoutsResponse {
  data: ShoutDto[];
  included: ImageDto[];
}
