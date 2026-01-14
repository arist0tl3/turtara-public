import argon2 from 'argon2';
import User from '../model';
import { createAuthToken } from '../../AuthToken/model';

interface RegisterInput {
  email: string;
  password: string;
}

async function register(_: any, { input }: { input: RegisterInput }, context: any) {
  try {
    const { email, password } = input;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        error: 'Email already in use',
      };
    }

    const hashedPassword = await argon2.hash(password);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Create auth token
    const token = await createAuthToken(user._id);

    console.log('token', token);

    return {
      success: true,
      token,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export default register;
