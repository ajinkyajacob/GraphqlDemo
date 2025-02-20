import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// Hash a password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

const genToken = (id: string, username: string) => {
  return sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const comparePassword = async (dbPass: string, userPass: string) => {
  return await compare(userPass, dbPass);
};

export { hashPassword, genToken, comparePassword };
