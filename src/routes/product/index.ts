import { FastifyInstance } from "fastify";
import {
    getProducts,
    addProduct,
    getProduct,
    updateProductHandler,
    deleteProductHandler,
} from "../../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
    fastify.get("/", getProducts);
    fastify.post("/", addProduct);
    fastify.get("/:id", getProduct);
    fastify.put("/:id", updateProductHandler);
    fastify.delete("/:id", deleteProductHandler);
}
