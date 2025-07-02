//==============================================
// Router xử lý các đường dẫn login, callback
//==============================================

import { FastifyInstance } from "fastify";
import { fetchGoogleUser } from "../../services/googleUser.service";

export default async function authRoutes(fastify: FastifyInstance) {
    // Callback sau khi Google redirect về
    fastify.get("/login/google/callback", async function (request, reply) {
        const tokenWrapper =
            await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
                request
            );
        // console.log("Google OAuth2 token:", tokenWrapper.token.access_token);

        const user = await fetchGoogleUser(tokenWrapper.token.access_token);

        // TODO: bạn có thể lưu user vào DB, tạo session hoặc JWT ở đây

        const jwt = this.jwt.sign({
            email: user.email,
            name: user.name,
            picture: user.picture,
        });

        // ⚠️ Nên chọn thông tin gọn nhẹ (không lưu cả access_token!)

        reply.setCookie("tokenJWT", jwt, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true, // đổi thành true nếu bạn dùng HTTPS
            maxAge: 3600 * 24 * 30, // 1 tháng
        });

        return reply.redirect("/auth/me");
        // return reply.send({ message: "Logged in", user });
        // return reply.send("OK"); //{ user });
    });

    fastify.get("/me", async function (request, reply) {
        try {
            const user = await request.jwtVerify(); // Đọc từ cookie "tokenJWT"
            return reply.send({ user });
        } catch (err) {
            return reply.code(401).send({ error: "Unauthorized:"+err });
        }
    });

    fastify.get("/logout", async function (request, reply) {
        // Xoá cookie user
        reply.clearCookie("tokenJWT", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true, // đổi thành true nếu bạn dùng HTTPS
        });

        return reply.redirect("/users");
    });
}
