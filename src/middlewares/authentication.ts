import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY =
  process.env.SECRET_KEY || 'adade3938eeh3huedaihoaheao83h3ra8oa3hr8a4';

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    // Decode token
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: number;
      username: string;
    };

    // Tambahkan decoded data ke req.user
    (req as any).user = {
      id: decoded.id,
      username: decoded.username,
    };

    next(); // Lanjut ke handler berikutnya
  } catch (error) {
    console.error('JWT verification error:', error); // Tambahkan log untuk debugging
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
