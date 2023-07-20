import Fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { DbFeedResponse } from "./types";
import { shouts, users, images } from "./data";

const fastify = Fastify({
  logger: true,
});

async function start() {
  await fastify.register(cors, {
    origin: "http://localhost:3000",
  });

  fastify.get("/api/feed", async function handler() {
    const feedResponse: DbFeedResponse = {
      data: shouts,
      included: [...users, ...images],
    };
    return feedResponse;
  });

  fastify.get(
    "/api/user/:handle",
    async function handler(
      req: FastifyRequest<{ Params: { handle: string } }>,
      reply
    ) {
      const user = users.find((u) => u.attributes.handle === req.params.handle);
      if (!user) {
        return reply.status(404);
      }
      return { data: user };
    }
  );

  fastify.get(
    "/api/user/:handle/shouts",
    async function handler(
      req: FastifyRequest<{ Params: { handle: string } }>,
      reply
    ) {
      const user = users.find((u) => u.attributes.handle === req.params.handle);
      if (!user) {
        return reply.status(404);
      }
      const userShouts = shouts.filter(
        (s) => s.attributes.authorId === user.id
      );
      const shoutImages = userShouts
        .map((s) => s.attributes.imageId)
        .filter((id): id is string => Boolean(id))
        .map((imageId) => images.find((i) => i.id === imageId));
      return { data: userShouts, included: shoutImages };
    }
  );

  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
