"use client";
import { useState, useEffect } from 'react';
import { User } from './user';
import CreateAccount from './CreateAccount';
import { useRouter } from 'next/navigation';

const url = "https://r2-worker.jackawilliams13.workers.dev/";

export default function UploadForm({ onUpload }: { onUpload?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<User>({userName: "", email: ""});
  const [photos, setPhotos] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    setCaptions((prev) => photos.map((_, i) => prev[i] || ''));
  }, [photos]);

  const handleCaptionChange = (idx: number, value: string) => {
    setCaptions((prev) => prev.map((c, i) => (i === idx ? value : c)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      setMessage('Please select at least one photo to upload.');
      return;
    }
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
      formData.append(`caption_${index}`, captions[index] || '');
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
        setCaptions([]);
        if (onUpload) {
            onUpload();
        } else {
            router.push('/photos?tab=wedding');
        }
      } else {
        setMessage('Failed to upload photos. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      { !userLoaded
        ? <CreateAccount user={user} setUser={setUser}/>
        : <>
        <h1 className="text-2xl font-bold mb-4">Add Your Photos</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex flex-wrap gap-2 mt-2">
                {photos.map((file, idx) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <img
                        src={url}
                        alt={file.name}
                        className="w-20 h-20 object-cover rounded border"
                        onLoad={() => URL.revokeObjectURL(url)}
                      />
                      <input
                        type="text"
                        placeholder="Add a caption"
                        value={captions[idx] || ''}
                        onChange={e => handleCaptionChange(idx, e.target.value)}
                        className="mt-1 w-20 text-xs p-1 border rounded"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </>
      }
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
}
