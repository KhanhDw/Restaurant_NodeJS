import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllSessions,
    createSession,
    getSessionByUserId,
    deleteSession,
    SessionCreateData,
} from "../models/session.model";

// Lấy tất cả sessions
export const getSessionsHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const sessions = await getAllSessions();
        return reply.send(sessions);
    } catch (err) {
        return reply
            .code(500)
            .send({ error: "Error fetching sessions: " + err });
    }
};

// Lấy session theo userId
export const getSessionByUserIdHandler = async (
    req: FastifyRequest<{ Params: { userId: number } }>,
    reply: FastifyReply
) => {
    const { userId } = req.params;
    try {
        const session = await getSessionByUserId(userId);
        if (session) {
            return reply.send(session);
        } else {
            return reply.code(404).send({ error: "Session not found" });
        }
    } catch (err) {
        return reply
            .code(500)
            .send({ error: "Error fetching session: " + err });
    }
};

// Tạo session mới
export const createSessionHandler = async (
    req: FastifyRequest<{ Body: SessionCreateData }>,
    reply: FastifyReply
) => {
    const sessionData = req.body;
    try {
        const session = await createSession(sessionData);
        return reply.code(201).send(session);
    } catch (err) {
        console.error("Error creating session:", err);
        return reply
            .code(400)
            .send({ error: "Error creating session: " + err });
    }
};

// Xoá session theo id
export const deleteSessionHandler = async (
    req: FastifyRequest<{ Params: { UserId: number } }>,
    reply: FastifyReply
) => {
    const { UserId } = req.params;
    try {
        await deleteSession(UserId);
        return reply.code(204).send();
    } catch (err) {
        return reply.code(404).send({ error: "Session not found: " + err });
    }
};
