import { Shout } from "@/domain/shout";

import { ShoutDto } from "./dto";

export function dtoToShout(shoutDto: ShoutDto): Shout {
  return {
    id: shoutDto.id,
    createdAt: shoutDto.createdAt,
    authorId: shoutDto.attributes.authorId,
    imageId: shoutDto.attributes.imageId,
    likes: shoutDto.attributes.likes,
    reshouts: shoutDto.attributes.reshouts,
    text: shoutDto.attributes.text,
    replies: shoutDto.relationships.replies,
  };
}
