import { ImageDto } from "@/services/image/image.interfaces";
import { dtoToEntity as imageDtoToEntity } from "@/services/image/image.adapter";
import { dtoToEntity as shoutDtoToEntity } from "@/services/shout/shout.adapter";
import { UserDto } from "@/services/user/user.interfaces";
import { dtoToEntity as userDtoToEntity } from "@/services/user/user.adapter";
import { GetFeedApi, GetFeedResponseDto } from "./feed.interfaces";
import { ShoutAggregate } from "@/domain/shout";

function dtoToEntities(dto: GetFeedResponseDto): ShoutAggregate[] {
  const included = dto.included.reduce(
    (acc, entity) => acc.set(entity.id, entity),
    new Map<string, UserDto | ImageDto>()
  );

  const shoutAggregates = dto.data.map((shoutDto) => {
    const authorDto = included.get(shoutDto.attributes.authorId) as UserDto;
    const imageDto =
      shoutDto.attributes.imageId &&
      (included.get(shoutDto.attributes.imageId) as ImageDto);

    const shout = shoutDtoToEntity(shoutDto);
    return {
      ...shout,
      author: userDtoToEntity(authorDto),
      image: imageDto && imageDtoToEntity(imageDto),
    };
  });

  return shoutAggregates;
}

export async function getFeed(api: GetFeedApi) {
  const res = await api();
  return dtoToEntities(res);
}
