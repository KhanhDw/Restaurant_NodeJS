import * as dotenv from "dotenv";
import Fastify from "fastify";
import corsFastify from "@fastify/cors";
import cookieFastify from "@fastify/cookie";
import jwtFastify from "@fastify/jwt";
import fs from "fs";
import path from "path";
import googleOAuth2Plugin from "./plugins/googleOAuth2";
import authenticatePlugin from "./plugins/protect";
import registerRoutes from "./routes";


dotenv.config();

const app = Fastify({
    logger: { level: "trace" },
    https: {
        key: fs.readFileSync(path.join(__dirname, "../certs/key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "../certs/cert.pem")),
    },
});

app.register(cookieFastify, {
    secret: process.env.COOKIE_SECRECT!,
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
    parseOptions: {}, // options for parsing cookies
});

app.register(jwtFastify, {
    secret: process.env.JWT_SECRET!,
    cookie: {
    cookieName: "tokenJWT", // Tên cookie chứa JWT
    signed: false,       // Có dùng cookie ký không
  },
});

app.register(corsFastify, {
    origin: ['https://localhost:3000'], // Cho phép tất cả các nguồn gốc= * hoặc  port font end = https://172.0.0.1:3002
    methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức HTTP được phép
    credentials: true, // Cho phép gửi cookie và thông tin xác thực khác
    allowedHeaders: ["Content-Type", "Authorization"], // Các header được phép
});

// Plugin Google OAuth2
app.register(googleOAuth2Plugin);
app.register(authenticatePlugin);

app.register(registerRoutes, { prefix: "/" });

const start = async () => {
    try {
        await app.listen({ port: 3001, host: "127.0.0.1" });
        console.log("🚀 Server running at http://127.0.0.1:3001");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
