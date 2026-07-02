import { Schema, model } from 'mongoose';

export interface ContactRequestDoc {
  email: string;
  createdAt: Date;
}

const contactRequestSchema = new Schema<ContactRequestDoc>({
  email: { type: String, required: true, trim: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactRequest = model<ContactRequestDoc>('ContactRequest', contactRequestSchema);
