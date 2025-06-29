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

/**
 * Lấy tất cả người dùng
 * @returns Promise<User[]>
 */
export const getAllUsers = (): Promise<User[]> => {
    return prisma.user.findMany();
};

/**
 * Lấy một người dùng bằng ID
 * @param id - ID của người dùng
 * @returns Promise<User | null>
 */
export const getUserById = (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id },
    });
};

/**
 * Tạo một người dùng mới
 * @param data - Dữ liệu của người dùng mới (name, email)
 * @returns Promise<User>
 */
export const createUser = (data: UserCreateData): Promise<User> => {
    return prisma.user.create({
        data,
    });
};

/**
 * Cập nhật thông tin người dùng bằng ID
 * @param id - ID của người dùng cần cập nhật
 * @param data - Dữ liệu cần cập nhật
 * @returns Promise<User>
 */
export const updateUser = (id: number, data: UserUpdateData): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data,
    });
};

/**
 * Xóa một người dùng bằng ID
 * @param id - ID của người dùng cần xóa
 * @returns Promise<User>
 */
export const deleteUser = (id: number): Promise<User> => {
    return prisma.user.delete({
        where: { id },
    });
};
