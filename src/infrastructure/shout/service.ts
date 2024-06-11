import ShoutApi from "./api";
import { CreateShoutInput, CreateShoutReplyInput } from "./dto";
import { dtoToShout } from "./transform";

async function createShout(input: CreateShoutInput, api = ShoutApi) {
  const { data: shoutDto } = await api.createShout(input);
  return dtoToShout(shoutDto);
}

async function createReply(
  { shoutId, replyId }: CreateShoutReplyInput,
  api = ShoutApi
) {
  const { data: replyDto } = await api.createReply({ shoutId, replyId });
  return dtoToShout(replyDto);
}

export default { createShout, createReply };
