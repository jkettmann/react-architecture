import { ImageDto } from "../media/dto";
import { ShoutDto } from "../shout/dto";
import { UserDto } from "../user/dto";

export interface FeedResponse {
  data: ShoutDto[];
  included: (UserDto | ImageDto)[];
}
