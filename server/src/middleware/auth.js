import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default function (req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // You can attach decoded user data to the request if needed
    req.admin = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
