import { Router } from 'express';
import { ContactRequest } from '../models/ContactRequest.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';

    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    await ContactRequest.create({ email });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});
