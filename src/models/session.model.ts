import { PrismaClient, Session } from "@prisma/client";
const prisma = new PrismaClient();

// Dữ liệu tạo session mới
export type SessionCreateData = {
    userId: number;
    sessionToken: string;
    expiresAt: Date;
    createAt: Date;
};

// Lấy tất cả sessions
export const getAllSessions = (): Promise<Session[]> => {
    return prisma.session.findMany();
};

export const getSessionByUserId = (userId: number): Promise<Session | null> => {
    return prisma.session.findFirst({
        where: { userId },
    });
};

// Tạo session mới
export const createSession = async (data: SessionCreateData): Promise<Session> => {
    return await prisma.session.create({
        data,
    });
};

// Xoá session
export const deleteSession = async (userId: number): Promise<Session> => {
    const session = await prisma.session.findFirst({
        where: { userId },
    });
    if (session) {
        return prisma.session.delete({
            where: { id: session.id },
        });
    } else {
        throw new Error("Session not found to delete");
    }
};
