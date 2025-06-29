import { FastifyInstance } from "fastify";
import {
    getUsers,
    addUser,
    getUser,
    updateUserHandler,
    deleteUserHandler,
} from "../../controllers/userController";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/", getUsers);
    fastify.post("/", addUser);
    fastify.get("/:id", getUser);
    fastify.put("/:id", updateUserHandler);
    fastify.delete("/:id", deleteUserHandler);
}
