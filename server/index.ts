import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { setTimeout } from "timers/promises";
import { fileURLToPath } from "url";
import util from "util";

import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import multipart from "@fastify/multipart";
import staticFiles from "@fastify/static";
// eslint-disable-next-line import/named
import Fastify, { FastifyRequest } from "fastify";

import { shouts, users, images } from "./data";
import {
  DbFeedResponse,
  DbImage,
  DbShout,
  DbUser,
  MeDto,
  UserDto,
} from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function waitRandomTime({ min = 500, max = 1500 } = {}) {
  const diff = Math.max(max - min, 1000);
  const randomTime = Math.floor(Math.random() * diff + min);
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
  const user = users.find((u) => u.attributes.handle === handle) || null;
  if (!user) {
    return null;
  }
  const meDto: MeDto = {
    ...user,
    relationships: {
      followerIds: users
        .filter((u) => u.attributes.followsUserIds.includes(user.id))
        .map((u) => u.id),
    },
  };
  return meDto;
}

function prepareUserForMe(user: DbUser, me: DbUser | null) {
  const userDto: UserDto = {
    ...user,
    relationships: {
      followerIds: users
        .filter((u) => u.attributes.followsUserIds.includes(user.id))
        .map((u) => u.id),
    } as UserDto["relationships"],
  };
  if (!me) {
    return userDto;
  }
  userDto.relationships.me = {
    attributes: {
      isBlocked: user.attributes.blockedUserIds.includes(me.id),
      isFollowing: user.attributes.followsUserIds.includes(me.id),
    },
  };
  return userDto;
}

function prepareUsersForMe(users: DbUser[], me: DbUser | null) {
  return users.map((u) => prepareUserForMe(u, me));
}

// feed
fastify.get("/api/feed", async function handler(req) {
  await waitRandomTime({ min: 1500 });
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
      return reply.status(404).send({ error: true });
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
      return reply.status(404).send({ error: true });
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
    req: FastifyRequest<{ Body: { username: string; password: string } }>,
    reply
  ) {
    await waitRandomTime();
    const { username: handle } = req.body;

    if (users.find((u) => u.attributes.handle === handle)) {
      const token = Buffer.from(handle).toString("base64");
      reply
        .status(200)
        .setCookie("token", token, {
          path: "/",
          signed: true,
          httpOnly: true,
        })
        .send({ ok: true });
    }

    return reply.status(401).send({ error: true });
  }
);

// logout
fastify.post("/api/logout", async function handler(req, reply) {
  await waitRandomTime();
  reply.clearCookie("token", { path: "/" });
  return reply.status(200).send({ ok: true });
});

// me
fastify.get("/api/me", async function handler(req) {
  await waitRandomTime();
  const me = getUserFromCookie(req.cookies);
  if (!me) {
    return { data: null };
  }
  return { data: me };
});

// image upload
fastify.post("/api/image", async function handler(req, reply) {
  const user = getUserFromCookie(req.cookies);
  if (!user) {
    return reply.status(401).send({ error: true });
  }

  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const data = await req.file();
  if (!data || !allowedFileTypes.includes(data.mimetype)) {
    return reply.status(400).send({ error: true });
  }

  const filename = `${images.length + 1}-${data.filename}`;
  const shoutDir = path.join(__dirname, "public", "shouts");
  if (!fs.existsSync(shoutDir)) {
    fs.mkdirSync(shoutDir);
  }
  const storedFile = fs.createWriteStream(path.join(shoutDir, filename));
  await pump(data.file, storedFile);

  const image: DbImage = {
    id: `image-${images.length + 1}`,
    type: "image",
    attributes: {
      url: `/cdn/shouts/${filename}`,
    },
  };
  images.push(image);
  return { data: image };
});

// shout
fastify.post(
  "/api/shout",
  async function handler(
    req: FastifyRequest<{ Body: { message: string; imageId?: string } }>,
    reply
  ) {
    await waitRandomTime();

    if (req.body.message === "error") {
      return reply.status(400).send({ error: "unkown error" });
    }

    const user = getUserFromCookie(req.cookies);
    if (!user) {
      return reply.status(401).send({ error: true });
    }
    user.attributes.numShoutsPastDay += 1;
    const shout: DbShout = {
      id: `shout-${shouts.length + 1}`,
      type: "shout",
      createdAt: Date.now(),
      attributes: {
        authorId: user.id,
        text: req.body.message,
        likes: 0,
        reshouts: 0,
        imageId: req.body.imageId,
      },
      relationships: {
        replies: [] as string[],
      },
    };
    shouts.unshift(shout);
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
      return reply.status(401).send({ error: true });
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    const replyShout = shouts.find((s) => s.id === req.body.replyId);
    if (!shout || !replyShout) {
      return reply.status(404).send({ error: true });
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
      return reply.status(401).send({ error: true });
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    if (!shout) {
      return reply.status(404).send({ error: true });
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
      return reply.status(401).send({ error: true });
    }
    const shout = shouts.find((s) => s.id === req.params.shoutId);
    if (!shout) {
      return reply.status(404).send({ error: true });
    }
    shout.attributes.reshouts += 1;
    return { data: shout };
  }
);

async function start() {
  try {
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
