import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

import mongoose from 'mongoose';
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('MongoDb Connected');
};
