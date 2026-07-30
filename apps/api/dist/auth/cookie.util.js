"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccessTokenCookie = setAccessTokenCookie;
exports.clearAccessTokenCookie = clearAccessTokenCookie;
const COOKIE_NAME = 'access_token';
function setAccessTokenCookie(res, token) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: isProd ? 'none' : 'lax',
        secure: isProd,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}
function clearAccessTokenCookie(res) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        sameSite: isProd ? 'none' : 'lax',
        secure: isProd,
    });
}
//# sourceMappingURL=cookie.util.js.map