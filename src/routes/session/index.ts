import { FastifyInstance } from "fastify";
import {
    getSessionsHandler,
    createSessionHandler,
    getSessionByUserIdHandler,
    deleteSessionHandler,
} from "../../controllers/session.controller";

export default async function sessionRoutes(fastify: FastifyInstance) {
    fastify.get("/", getSessionsHandler);
    fastify.post("/", createSessionHandler);
    fastify.get("/:userId", getSessionByUserIdHandler);
    fastify.delete("/:userId", deleteSessionHandler);
}
