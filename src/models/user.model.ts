import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// Định nghĩa kiểu dữ liệu cho việc tạo và cập nhật User
// Điều này giúp code an toàn và dễ tái sử dụng hơn
export type UserCreateData = {
    name: string;
    email: string;
};

export type UserUpdateData = {
    name?: string; // Dấu ? cho biết các trường này không bắt buộc
    email?: string;
};


export const getAllUsers = (): Promise<User[]> => {
    return prisma.user.findMany();
};


export const getUserById = (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id },
    });
};


export const createUser = (data: UserCreateData): Promise<User> => {
    return prisma.user.create({
        data,
    });
};


export const updateUser = (id: number, data: UserUpdateData): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data,
    });
};


export const deleteUser = (id: number): Promise<User> => {
    return prisma.user.delete({
        where: { id },
    });
};
