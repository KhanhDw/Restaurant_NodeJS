import "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
    interface FastifyInstance {
        googleOAuth2: OAuth2Namespace;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

