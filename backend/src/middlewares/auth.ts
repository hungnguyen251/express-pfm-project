import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prismaService } from '../services/prisma';

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Token Invalid, Please login again' });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded.id) {
      return res.status(400).json({ message: 'Token Invalid' });
    }

    const user = await prismaService.user.findUnique(decoded.id);
    if (!user) {
      return res.sendStatus(404);
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token Invalid' });
  }
};
