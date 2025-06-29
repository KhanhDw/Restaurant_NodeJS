//=============================================
// Cấu hình Fastify plugin đăng nhập Google
//=============================================
import fp from "fastify-plugin";
import fastifyOauth2 from "@fastify/oauth2";
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL,
} from "../utils/env";

export default fp(async function (fastify) {
    fastify.register(fastifyOauth2, {
        name: "googleOAuth2",
        scope: ["profile", "email"],
        credentials: {
            client: {
                id: GOOGLE_CLIENT_ID,
                secret: GOOGLE_CLIENT_SECRET,
            },
            auth: fastifyOauth2.GOOGLE_CONFIGURATION,
        },
        startRedirectPath: "/auth/login/google",
        callbackUri: GOOGLE_CALLBACK_URL,
    });
});
