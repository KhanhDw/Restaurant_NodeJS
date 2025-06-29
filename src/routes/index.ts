import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import userRoutes from "./user";
import productRoutes from "./product";
import sessionRoutes from "./session";

async function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(userRoutes, { prefix: "/users" });
    fastify.register(productRoutes, { prefix: "/products" });
    fastify.register(sessionRoutes, { prefix: "/session" });
}
export default fp(routes);
