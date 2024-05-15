import ShoutApi from "./api";
import { CreateShoutInput, CreateShoutReplyInput } from "./dto";
import { dtoToShout } from "./transform";

async function createShout(input: CreateShoutInput) {
  const { data: shoutDto } = await ShoutApi.createShout(input);
  return dtoToShout(shoutDto);
}

async function createReply({ shoutId, replyId }: CreateShoutReplyInput) {
  const { data: replyDto } = await ShoutApi.createReply({ shoutId, replyId });
  return dtoToShout(replyDto);
}

export default { createShout, createReply };
