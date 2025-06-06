"use client";

import { useState, useRef } from 'react';
import { User, sendLoginEmail } from './user';

const url = "https://r2-worker.hannahjackwedding.com/createAccount";

export default function CreateAccount(props: {user: User, setUser: any, onSuccess?: () => void, showLogout?: boolean}) {
  const {user, setUser, onSuccess, showLogout} = props;

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('userId', user.userId ?? "");
    formData.append('userKey', user.userKey ?? "");

    if (profilePicFile) {
        formData.append('profilePicture', profilePicFile);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      setIsLoading(false);
      if (!response.ok) {
        if (response.status == 409) {
          setMessage('An account with that email already exists. Check your email for a login link!');
          await sendLoginEmail(user as User);
          return;
        } 
        setMessage('Failed to create account. Please try again.');
        return;
      } 
      const u = (await response.json()) as User;
      localStorage.setItem('HannahJackWeddingUser', JSON.stringify(u));
      setUser(u);
      if (onSuccess) onSuccess(); // Close modal on success

    } catch (error) {
      setMessage('An unknown error occurred. Please try again. If this persists, please check your email for a login link');
      console.log(error);
    } finally {
      setIsLoading(false);
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
    {user.userKey != null && user.userKey != "" 
    ? <h2 className="text-2xl font-bold mb-4">Edit your account</h2>
    : <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
    }
    {isLoading && <div className="text-center text-indigo-600">Loading...</div>}
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
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Profile Picture (optional)</label>
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
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    {message}
    {user.userKey != null && user.userKey != "" && showLogout && (
      <button
        type="button"
        className="w-full mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        onClick={() => {
          localStorage.removeItem('HannahJackWeddingUser');
          setUser({userName: "", email: ""});
        }}
      >
        Log out
      </button>
    )}
  </div>
}