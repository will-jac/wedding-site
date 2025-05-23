"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import HomeLayout from '../components/HomeLayout';
import { getUser, User } from '../components/user';

export default function UploadLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const userId = searchParams.get('userId');
    const userKey = searchParams.get('userKey');

    if (userId && userKey) {
        (async () => {
            // fetch the full user from the remote db
            const user = await getUser(userKey);
            // Save credentials to localStorage for future use
            localStorage.setItem('HannahJackWeddingUser', JSON.stringify(user));
            // Optionally, redirect to the upload page or show a success message
            router.replace('/upload');
        })();
    }
  }, [searchParams, router]);

  return (
    <HomeLayout>
      <div className="p-5 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Logging you in...</h1>
        <p>If you are not redirected, please check your login link or try again.</p>
      </div>
    </HomeLayout>
  );
}