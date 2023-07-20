import Fastify from "fastify";
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

  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
