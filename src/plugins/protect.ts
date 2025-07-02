// plugin bảo vệ middleware

import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";

const authenticatePlugin: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorate("authenticate", async function (request:any, reply:any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  done();
};

export default fp(authenticatePlugin);
