import { compare, genSalt, hash } from 'bcrypt';

export async function hashPass(
  password: string,
  saltRounds: number = 12,
): Promise<string> {
  try {
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
  } catch (error) {
    console.error('Password hashing failed:', error.message);
    throw new Error('Failed to hash password');
  }
}

export async function verifyPass(
  oldPassword: string,
  password: string,
): Promise<boolean> {
  try {
    return await compare(oldPassword, password);
  } catch (error) {
    console.error('Password verification failed:', error.message);
    throw new Error('Failed to verify password');
  }
}
