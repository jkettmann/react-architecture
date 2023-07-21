import { setTimeout } from "timers/promises";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";
import Fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import staticFiles from "@fastify/static";
import multipart from "@fastify/multipart";
import { DbFeedResponse, DbImage, DbShout, DbUser } from "./types";
import { shouts, users, images } from "./data";

const pump = util.promisify(pipeline);

const fastify = Fastify({
  logger: true,
});

fastify.register(cookie, {
  secret: "a-super-dark-secret",
} as FastifyCookieOptions);

fastify.register(multipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

fastify.register(staticFiles, {
  root: path.join(__dirname, "public"),
  prefix: "/cdn",
});

function waitRandomTime() {
  const randomTime = Math.floor(Math.random() * 1000 + 500);
  return setTimeout(randomTime);
}

function getHandleFromCookie(cookies: Record<string, string | undefined>) {
  const token = cookies.token;
  if (!token) {
    return null;
  }
  return Buffer.from(token, "base64").toString("utf-8");
}

function getUserFromCookie(cookies: Record<string, string | undefined>) {
  const handle = getHandleFromCookie(cookies);
  if (!handle) {
    return null;
  }
  return users.find((u) => u.attributes.handle === handle) || null;
}

function prepareUserForMe(user: DbUser, me: DbUser | null) {
  if (!me) {
    return user;
  }
  return {
    ...user,
    relationships: {
      ...user.relationships,
      data: {
        isBlocked: user.attributes.blockedUserIds.includes(me.id),
        isFollowing: user.attributes.followsUserIds.includes(me.id),
      },
    },
  };
}

function prepareUsersForMe(users: DbUser[], me: DbUser | null) {
  return users.map((u) => prepareUserForMe(u, me));
}

// feed
fastify.get("/api/feed", async function handler(req) {
  await waitRandomTime();
  const me = getUserFromCookie(req.cookies);
  const feedResponse: DbFeedResponse = {
    data: shouts,
    included: [...prepareUsersForMe(users, me), ...images],
  };
  return feedResponse;
});

// user
fastify.get(
  "/api/user/:handle",
  async function handler(
    req: FastifyRequest<{ Params: { handle: string } }>,
    reply
  ) {
    await waitRandomTime();
    const user = users.find((u) => u.attributes.handle === req.params.handle);
    if (!user) {
      return reply.status(404);
    }
    const me = getUserFromCookie(req.cookies);
    return { data: prepareUserForMe(user, me) };
  }
);

// shouts by user
fastify.get(
  "/api/user/:handle/shouts",
  async function handler(
    req: FastifyRequest<{ Params: { handle: string } }>,
    reply
  ) {
    await waitRandomTime();
    const user = users.find((u) => u.attributes.handle === req.params.handle);
    if (!user) {
      return reply.status(404);
    }
    const userShouts = shouts.filter((s) => s.attributes.authorId === user.id);
    const shoutImages = userShouts
      .map((s) => s.attributes.imageId)
      .filter((id): id is string => Boolean(id))
      .map((imageId) => images.find((i) => i.id === imageId));
    return { data: userShouts, included: shoutImages };
  }
);

// login
fastify.post(
  "/api/login",
  async function handler(
    req: FastifyRequest<{ Body: { handle: string; password: string } }>,
    reply
  ) {
    await waitRandomTime();
    const { handle } = req.body;

    if (handle === "prettypinkpony") {
      const token = Buffer.from(handle).toString("base64");
      reply.status(200).setCookie("token", token, {
        path: "/",
        signed: true,
        httpOnly: true,
      });
    }

    return reply.status(401);
  }
);

// logout
fastify.post("/api/logout", async function handler(req, reply) {
  await waitRandomTime();
  reply.clearCookie("token", { path: "/" });
  return reply.status(200);
});

// me
fastify.get("/api/me", async function handler(req, reply) {
  await waitRandomTime();
  const user = getUserFromCookie(req.cookies);
  if (!user) {
    return reply.status(401);
  }
  return { data: user };
});

// image upload
fastify.post("/api/image", async function handler(req, reply) {
  await waitRandomTime();
  const user = getUserFromCookie(req.cookies);
  if (!user) {
    return reply.status(401);
  }

  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const data = await req.file();
  if (!data || !allowedFileTypes.includes(data.mimetype)) {
    return reply.status(400);
  }

  const filename = `${images.length + 1}-${data.filename}`;
  const storedFile = fs.createWriteStream(
    path.join(__dirname, "public", filename)
  );
  await pump(data.file, storedFile);

  const image: DbImage = {
    id: `image-${images.length + 1}`,
    type: "image",
    attributes: {
      url: `/cdn/images/${filename}`,
    },
  };
  images.push(image);
  return { data: image };
});

// shout
fastify.post(
  "/api/shout",
  async function handler(
    req: FastifyRequest<{ Body: { text: string; imageId?: string } }>,
    reply
  ) {
    await waitRandomTime();
    const user = getUserFromCookie(req.cookies);
    if (!user) {
      return reply.status(401);
    }
    const shout: DbShout = {
      id: `shout-${shouts.length + 1}`,
      type: "shout",
      createdAt: Date.now(),
      attributes: {
        authorId: user.id,
        text: req.body.text,
        likes: 0,
        reshouts: 0,
        imageId: req.body.imageId,
      },
      relationships: {
        replies: [] as string[],
      },
    };
    shouts.push(shout);
    return { data: shout };
  }
);

// shout reply
fastify.post(
  "/api/shout/:shoutId/reply",
  async function handler(
    req: FastifyRequest<{
      Params: { shoutId: string };
      Body: { replyId: string };
    }>,
    reply
  ) {
    await waitRandomTime();
    const user = getUserFromCookie(req.cookies);
    if (!user) {
      return reply.status(401);
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    const replyShout = shouts.find((s) => s.id === req.body.replyId);
    if (!shout || !replyShout) {
      return reply.status(404);
    }
    shout.relationships.replies.push(replyShout.id);
    // add replyTo field to the shout entity
    replyShout.relationships.replyTo = shout.id;
    return { data: shout };
  }
);

// shout like
fastify.post(
  "/api/shout/:shoutId/like",
  async function handler(
    req: FastifyRequest<{ Params: { shoutId: string } }>,
    reply
  ) {
    await waitRandomTime();
    const user = getUserFromCookie(req.cookies);
    if (!user) {
      return reply.status(401);
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    if (!shout) {
      return reply.status(404);
    }
    shout.attributes.likes += 1;
    return { data: shout };
  }
);

// shout reshout
fastify.post(
  "/api/shout/:shoutId/reshout",
  async function handler(
    req: FastifyRequest<{ Params: { shoutId: string } }>,
    reply
  ) {
    await waitRandomTime();
    const user = getUserFromCookie(req.cookies);
    if (!user) {
      return reply.status(401);
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    if (!shout) {
      return reply.status(404);
    }
    shout.attributes.reshouts += 1;
    return { data: shout };
  }
);

async function start() {
  await fastify.register(cors, {
    origin: "http://localhost:3000",
  });

  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
