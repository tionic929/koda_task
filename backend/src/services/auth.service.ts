import { prisma } from '../lib/prisma.js';
import type { LoginInput } from '../schemas/auth.schema.js';
import { comparePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw { status: 401, message: 'Invalid email or password' };
  }

  const token = signToken({ userId: user.id, email: user.email, role: user.role });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  return user;
};
