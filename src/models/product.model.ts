import { PrismaClient, Product } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient();

export type productCreateData = {
    name: string;
    price: number;
    description?: string;
    image?: string;
};

export type productUpdateData = {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
};

/**
 * Lấy tất cả sản phẩm
 * @returns Promise<Product[]>
 */
export const getAllProducts = (): Promise<Product[]> => {
    return prisma.product.findMany();
};

/**
 * Lấy một sản phẩm bằng ID
 * @param id - ID của sản phẩm
 * @returns Promise<Product | null>
 */
export const getProductById = (id: string): Promise<Product | null> => {
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
        console.error(`Invalid product ID: ${id}`);
        return Promise.resolve(null);
    }

    return prisma.product.findUnique({
        where: { id: productId },
    });
};

/**
 * Tạo một sản phẩm mới
 * @param data - Dữ liệu của sản phẩm mới (name, email)
 * @returns Promise<Product>
 */
export const createProduct = (data: productCreateData): Promise<Product> => {
    return prisma.product.create({
        data,
    });
};

/**
 * Cập nhật thông tin sản phẩm bằng ID
 * @param id - ID của sản phẩm cần cập nhật
 * @param data - Dữ liệu cần cập nhật
 * @returns Promise<Product>
 */
export const updateProduct = (
    id: number,
    data: productUpdateData
): Promise<Product> => {
    return prisma.product.update({
        where: { id },
        data,
    });
};

/**
 * Xóa một sản phẩm bằng ID
 * @param id - ID của sản phẩm cần xóa
 * @returns Promise<Product>
 */
export const deleteProduct = (id: number): Promise<Product> => {
    return prisma.product.delete({
        where: { id },
    });
};
