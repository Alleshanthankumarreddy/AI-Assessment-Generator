import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 5,

    message: {
        success: false,
        message: "Too many login attempts. Please try again after 15 minutes."
    },

    standardHeaders: true,
    legacyHeaders: false,
});