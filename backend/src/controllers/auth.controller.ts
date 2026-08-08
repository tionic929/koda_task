import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await authService.getUserById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
