// routes/auth.routes.js
import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST api/signup
// @desc    Register a user
// @access  Public
router.post('/signup', signup);

// @route   POST api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

export default router;
