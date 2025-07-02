import { PrismaClient, Product } from "@prisma/client";

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


export const getAllProducts = (): Promise<Product[]> => {
    return prisma.product.findMany();
};


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


export const createProduct = (data: productCreateData): Promise<Product> => {
    return prisma.product.create({
        data,
    });
};


export const updateProduct = (
    id: number,
    data: productUpdateData
): Promise<Product> => {
    return prisma.product.update({
        where: { id },
        data,
    });
};


export const deleteProduct = (id: number): Promise<Product> => {
    return prisma.product.delete({
        where: { id },
    });
};
