import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    UserCreateData,
} from "../models/user.model";

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    const users = await getAllUsers();
    return reply.send(users);
};

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const userData = req.body as UserCreateData;
    try {
        const user = await createUser(userData);
        return reply.code(201).send(user);
    } catch (err) {
        return reply.code(400).send({ error: "Error creating user" });
    }
};

export const getUser = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user) {
        return reply.send(user);
    } else {
        return reply.code(404).send({ error: "User not found" });
    }
};

export const updateUserHandler = async (
    req: FastifyRequest<{
        Params: { id: number };
        Body: { name?: string; email?: string };
    }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await updateUser(id, userData);
        return reply.send(updatedUser);
    } catch (err) {
        return reply.code(400).send({ error: "Error updating user" });
    }
};

export const deleteUserHandler = async (
    req: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    try {
        await deleteUser(id);
        return reply.code(204).send();
    } catch (err) {
        return reply.code(404).send({ error: "User not found" });
    }
};
