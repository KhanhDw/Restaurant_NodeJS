import Fastify from "fastify";
import dotenv from "dotenv";
import registerRoutes from "./routes";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(registerRoutes, { prefix: "/" });

const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: "0.0.0.0" });
        console.log("🚀 Server running at http://localhost:3001");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
