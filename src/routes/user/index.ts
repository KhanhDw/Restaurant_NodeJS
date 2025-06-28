import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance) {
    fastify.get("/", async (req, reply) => {
        const users = await prisma.user.findMany();
        return users;
    });

    fastify.post("/", async (req, reply) => {
        const { name, email } = req.body as { name: string; email: string };
        try {
            const user = await prisma.user.create({
                data: { name, email },
            });
            return reply.code(201).send(user);
        } catch (err) {
            return reply
                .code(400)
                .send({ error: "Email đã tồn tại hoặc lỗi khác" });
        }
    });
}
