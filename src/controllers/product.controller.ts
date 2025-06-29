import { FastifyReply, FastifyRequest } from "fastify";
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    productCreateData as ProductCreateData,
    productUpdateData as ProductUpdateData,
} from "../models/product.model";

export const getProducts = async (req: FastifyRequest, reply: FastifyReply) => {
    const Products = await getAllProducts();
    return reply.send(Products);
};

export const addProduct = async (req: FastifyRequest, reply: FastifyReply) => {
    const ProductData = req.body as ProductCreateData;
    try {
        const Product = await createProduct(ProductData);
        return reply.code(201).send(Product);
    } catch (err) {
        return reply.code(400).send({ error: "Error creating Product" });
    }
};

export const getProduct = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const Product = await getProductById(id);
    if (Product) {
        return reply.send(Product);
    } else {
        return reply.code(404).send({ error: "Product not found" });
    }
};

export const updateProductHandler = async (
    req: FastifyRequest<{
        Params: { id: string };
        Body: {
            name?: string;
            price?: number;
            description?: string;
            image?: string;
            updatedAt?: Date;
        };
    }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    const ProductData = req.body;
    try {
        const updatedProduct = await updateProduct(productId, ProductData);
        return reply.send(updatedProduct);
    } catch (err) {
        console.error(err);
        return reply.code(400).send({ error: "Error updating Product" });
    }
};

export const deleteProductHandler = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;

    const productId = parseInt(id, 10);

    try {
        await deleteProduct(productId);
        return reply
            .code(204)
            .send({ message: "Product deleted successfully" });
    } catch (err) {
        return reply.code(404).send({ error: "Product not found" });
    }
};
