//======================================
// Gọi Google API lấy thông tin user
//======================================

export async function fetchGoogleUser(access_token: string) {
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch Google user info");

    return await res.json();
}
