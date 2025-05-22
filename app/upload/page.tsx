"use client";
import { useState, useEffect } from 'react';
import HomeLayout from '../components/HomeLayout';
import { User } from '../components/user';
import CreateAccount from '../components/CreateAccount';

const url = "https://r2-worker.jackawilliams13.workers.dev/"

export default function AddPhotoPage() {
  const [user, setUser] = useState<User|null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Try to load account from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('HannahJackWeddingUser') : null;
    console.log("got user:");
    console.log(stored);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.log("error loading user" + stored)
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (photos.length === 0) {
      setMessage('Please select at least one photo to upload.');
      return;
    }

    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-hjwedding-userKey': user?.userKey ?? ""
        },
        body: formData,
      });

      if (response.ok) {
        setMessage('Photos uploaded successfully!');
        setPhotos([]);
      } else {
        setMessage('Failed to upload photos. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <HomeLayout>
      <div className="p-5 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Your Photos</h1>
        { !user 
        ? <CreateAccount user={user} setUser={setUser}/>
        : <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Upload Photos</label>
            <input
              type="file"
              id="photos"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos(e.target.files ? Array.from(e.target.files) : [])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
        }
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </div>
    </HomeLayout>
  );
}