"use client";

import { useState } from 'react';
import { User, createAccount } from './user';

export default function CreateAccount(props: {user: User|null, setUser: any}) {
  const {user, setUser} = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await createAccount(name, email);
      console.log("setting user");
      console.log(u);
      if (u == null) {
        setMessage('Failed to create account. Please try again.');
        return;
      }
      localStorage.setItem('HannahJackWeddingUser', JSON.stringify(u));
      setUser(u);
    } catch (error) {
      console.log("an error occured")
      setMessage('An error occurred. Please try again. If this persists, please check your email for a login link');
      setUser(null);
    }
  };

  return <div>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
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