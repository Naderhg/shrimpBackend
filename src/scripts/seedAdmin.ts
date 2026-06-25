import dotenv from 'dotenv';
import { connectDB } from '../config/database';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'nadertok111@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await hashPassword('Nader@012');
    const admin = new User({
      email: 'nadertok111@gmail.com',
      password: hashedPassword,
      name: 'Nader Admin',
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: nadertok111@gmail.com');
    console.log('Password: Nader@012');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
