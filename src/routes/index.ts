import { FastifyInstance, FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import userRoutes from "./user";
import productRoutes from "./product";

async function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {
    fastify.register(userRoutes, { prefix: "/users" });
    fastify.register(productRoutes, { prefix: "/products" });
}
export default fp(routes);
