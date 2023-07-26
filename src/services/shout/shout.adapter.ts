import { Shout, ShoutAggregate, ShoutId } from "@/domain/shout";
import {
  CreateShoutApi,
  CreateShoutParams,
  GetByUserApi,
  GetByUserParams,
  GetByUserResponseDto,
  ShoutDto,
} from "./shout.interfaces";
import { ImageDto } from "../image/image.interfaces";
import { dtoToEntity as imageDtoToEntity } from "../image/image.adapter";

export function dtoToEntity(dto: ShoutDto): Shout {
  return {
    id: dto.id,
    type: dto.type,
    createdAt: dto.createdAt,
    text: dto.attributes.text,
    likes: dto.attributes.likes,
    reshouts: dto.attributes.reshouts,
    imageId: dto.attributes.imageId,
    authorId: dto.attributes.authorId,
    replies: dto.relationships.replies,
    replyTo: dto.relationships.replyTo,
  };
}

export async function createShout(
  api: CreateShoutApi,
  params: CreateShoutParams
): Promise<ShoutId> {
  const dto = await api(params);
  return dto.data.id;
}

function dtoToEntities(dto: GetByUserResponseDto): ShoutAggregate[] {
  const included = dto.included.reduce(
    (acc, entity) => acc.set(entity.id, entity),
    new Map<string, ImageDto>()
  );

  const shoutAggregates = dto.data.map((shoutDto) => {
    const imageDto =
      shoutDto.attributes.imageId &&
      (included.get(shoutDto.attributes.imageId) as ImageDto);

    const shout = dtoToEntity(shoutDto);
    return {
      ...shout,
      image: imageDto && imageDtoToEntity(imageDto),
    };
  });

  return shoutAggregates;
}

export async function getByUser(api: GetByUserApi, params: GetByUserParams) {
  const res = await api(params);
  return dtoToEntities(res);
}
