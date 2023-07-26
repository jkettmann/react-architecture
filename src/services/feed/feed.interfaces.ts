import { ImageDto } from "@/services/image/image.interfaces";
import { ShoutDto } from "@/services/shout/shout.interfaces";
import { UserDto } from "@/services/user/user.interfaces";

export interface GetFeedResponseDto {
  data: ShoutDto[];
  included: (UserDto | ImageDto)[];
}

export type GetFeedApi = () => Promise<GetFeedResponseDto>;
