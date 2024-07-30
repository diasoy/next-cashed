import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import type { User } from '@/libs/definitions';
import bcrypt from 'bcrypt';

// Konfigurasi koneksi database MySQL localhost
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'next_cashed',
};

async function getUser(email: string): Promise<User | undefined> {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute<RowDataPacket[]>(`SELECT * FROM user WHERE email = ?`, [email]);
    const user = rows[0] as User | undefined;
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
