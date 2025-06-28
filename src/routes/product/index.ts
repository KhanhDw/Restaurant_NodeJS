import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance) {
    fastify.get("/", async (req, reply) => {
        const products = await prisma.product.findMany();
        return products;
    });

    fastify.post("/", async (req, reply) => {
        const { name, price, description } = req.body as {
            name: string;
            price: number;
            description?: string;
        };
        try {
            const product = await prisma.product.create({
                data: { name, price, description },
            });
            return reply.code(201).send(product);
        } catch (err) {
            return reply.code(400).send({ error: "Error creating product" });
        }
    });
}
