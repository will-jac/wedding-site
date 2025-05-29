"use client";
import HomeLayout from '../components/HomeLayout';
import CreateAccount from '../components/CreateAccount';
import { User } from '../components/user';
import { useEffect, useState } from 'react';

export default function AccountPage() {
    const [user, setUser] = useState<User>({userName: "", email: ""});
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        // Try to load account from localStorage
        const stored = typeof window !== 'undefined' ? localStorage.getItem('HannahJackWeddingUser') : null;
        if (stored) {
            try {
            setUser(JSON.parse(stored));
            setUserLoaded(true);
            } catch {
            console.log("error loading user" + stored)
            }
        }
    }, []);
    
  return (
    <HomeLayout>
      <CreateAccount user={user} setUser={setUser} onSuccess={() => setUserLoaded(true)} showLogout={true}/>
    </HomeLayout>
  );
}