import { dtoToImage } from "../media/transform";
import { dtoToShout } from "../shout/transform";

import UserApi from "./api";
import { dtoToMe, dtoToUser } from "./transform";

async function getMe() {
  const { data: meDto } = await UserApi.getMe();
  return dtoToMe(meDto);
}

async function getUser(handle: string) {
  const { data: userDto } = await UserApi.getUser(handle);
  return dtoToUser(userDto);
}

async function getUserShouts(handle: string) {
  const { data: shoutDtos, included: imageDtos } =
    await UserApi.getUserShouts(handle);
  const shouts = shoutDtos.map(dtoToShout);
  const images = imageDtos.map(dtoToImage);
  return { shouts, images };
}

export default { getMe, getUser, getUserShouts };
