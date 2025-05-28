"use client";

import { useState, useRef } from 'react';
import { User, sendLoginEmail } from './user';

export async function createAccountWithProfilePic(user: User, profilePicFile?: File): Promise<User> {
  const url = "https://r2-worker.jackawilliams13.workers.dev/createAccount";
  const formData = new FormData();
  formData.append('userName', user.userName);
  formData.append('email', user.email);
  formData.append('userId', user.userId ?? "");
  formData.append('userKey', user.userKey ?? "");

  if (profilePicFile) {
      formData.append('profilePicture', profilePicFile);
  }
  const response = await fetch(url, {
      method: 'POST',
      body: formData,
  });
  if (!response.ok) {
      throw new Error(`Failed to create account: ${response.statusText}`);
  }
  const body = await response.json();

  if (!user.userKey) {
    await sendLoginEmail(body as User);
  }
  
  return body as User;
}

export default function CreateAccount(props: {user: User, setUser: any, onSuccess?: () => void, isEditing?: boolean}) {
  const {user, setUser, onSuccess, isEditing} = props;

  const [message, setMessage] = useState('');

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await createAccountWithProfilePic(JSON.parse(JSON.stringify(user)), profilePicFile || undefined);
      if (u == null) {
        setMessage('Failed to create account. Please try again.');
        return;
      }
      localStorage.setItem('HannahJackWeddingUser', JSON.stringify(u));
      setUser(u);
      if (onSuccess) onSuccess(); // Close modal on success
    } catch (error) {
      setMessage('An error occurred. Please try again. If this persists, please check your email for a login link');
      console.log(error);
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setProfilePicFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicPreview(null);
    }
  };

  return <div>
    {isEditing 
    ? <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
    : <h2 className="text-2xl font-bold mb-4">Edit your Account</h2>
    }
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          type="text"
          id="username"
          value={user.userName}
          onChange={e => setUser({...user, userName: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleProfilePicChange}
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {profilePicPreview && (
          <img src={profilePicPreview} alt="Profile Preview" className="w-16 h-16 rounded-full mt-2 object-cover border" />
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
    {message}
  </div>
}