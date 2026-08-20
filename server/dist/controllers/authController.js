"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const config_1 = require("../config");
class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Username, email, and password are required.' });
                return;
            }
            if (username.length < 3) {
                res.status(400).json({ error: 'Username must be at least 3 characters long.' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ error: 'Password must be at least 6 characters long.' });
                return;
            }
            const existingUser = await db_1.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: email.toLowerCase() },
                        { username: username }
                    ]
                }
            });
            if (existingUser) {
                if (existingUser.email.toLowerCase() === email.toLowerCase()) {
                    res.status(400).json({ error: 'Email is already registered.' });
                    return;
                }
                res.status(400).json({ error: 'Username is already taken.' });
                return;
            }
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            const user = await db_1.prisma.user.create({
                data: {
                    username,
                    email: email.toLowerCase(),
                    passwordHash,
                }
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, config_1.config.jwtSecret, { expiresIn: '7d' });
            res.status(201).json({
                message: 'Account created successfully.',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                }
            });
        }
        catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ error: 'Internal server error during registration.' });
        }
    }
    static async login(req, res) {
        try {
            const { identifier, password } = req.body; // identifier can be email or username
            if (!identifier || !password) {
                res.status(400).json({ error: 'Username/email and password are required.' });
                return;
            }
            const user = await db_1.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: identifier.toLowerCase() },
                        { username: identifier }
                    ]
                }
            });
            if (!user) {
                res.status(401).json({ error: 'Invalid username/email or password.' });
                return;
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!isMatch) {
                res.status(401).json({ error: 'Invalid username/email or password.' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, config_1.config.jwtSecret, { expiresIn: '7d' });
            res.json({
                message: 'Logged in successfully.',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                }
            });
        }
        catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Internal server error during login.' });
        }
    }
    static async logout(req, res) {
        res.json({ message: 'Logged out successfully.' });
    }
    static async getMe(req, res) {
        if (!req.user) {
            res.status(401).json({ error: 'Not authenticated.' });
            return;
        }
        try {
            const user = await db_1.prisma.user.findUnique({
                where: { id: req.user.id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true,
                }
            });
            if (!user) {
                res.status(404).json({ error: 'User not found.' });
                return;
            }
            res.json({ user });
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch user profile.' });
        }
    }
}
exports.AuthController = AuthController;
