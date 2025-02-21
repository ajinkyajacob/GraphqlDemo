import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

export const genToken = (id: string, email: string) => {
  return sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const getUserFromToken = (token: string | undefined) => {
  try {
    return verify(token, process.env.JWT_SECRET as string);
  } catch {
    throw new Error('Invalid or expired token');
  }
};

export const comparePassword = async (dbPass: string, userPass: string) => {
  return await compare(userPass, dbPass);
};
