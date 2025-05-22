'use server';
import { ImageProps } from './gallery/utils/types';

export interface User {
  email: string;
  userId: string;
  userKey: string;
  userName: string;
  profilePicture?: ImageProps;
}


export async function createAccount(userName: string, email: string): Promise<User> {
    const url = "https://r2-worker.jackawilliams13.workers.dev/createAccount";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email }),
    });
    if (!response.ok) {
        throw new Error(`Failed to create account: ${response.statusText}`);
    }
    const user: User = await response.json();

    return user;
}