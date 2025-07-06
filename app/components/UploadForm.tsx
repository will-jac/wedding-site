"use client";
import { useState, useEffect } from 'react';
import { User } from './user';
import CreateAccount from './CreateAccount';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import { gzip } from 'pako';

const url = "https://r2-worker.hannahjackwedding.com/";

export default function UploadForm({ onUpload }: { onUpload?: () => void }) {
  const router = useRouter();
  const [user, setUser] = useState<User>({userName: "", email: ""});
  const [photos, setPhotos] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [userLoaded, setUserLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Try to load account from localStorage
    const stored = typeof window !== 'undefined' ? localStorage.getItem('HannahJackWeddingUser') : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
        setUserLoaded(true);
        document.cookie = `x-hjwedding-userId = ${user.userId}; Secure; domain=hannahjackwedding.com`;
        document.cookie = `x-hjwedding-userKey = ${user.userKey}; Secure; domain=hannahjackwedding.com`;
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
    setIsLoading(true);
    setMessage('');
    try {
      const fileNames = photos.map(f => f.name);
      console.log(`uploading   ${Date()}`);
      // Submit each photo in parallel
      const responses = await Promise.all(
        photos.map(async (photo, index) => {          
          const p = await imageCompression(photo, {
            maxSizeMB: 0.5, // adjust as needed
            maxWidthOrHeight: 1920, // adjust as needed
            useWebWorker: true,
            fileType: "image/jpeg"
          });
          return fetch(url, {
            method: 'PUT',
            headers: {
              'x-hjwedding-userKey': user?.userKey ?? "",
              'x-hjwedding-userId': user?.userId ?? "",
              'x-hjwedding-userName': user?.userName ?? "",
              'caption': captions[index] || '',
              'name': fileNames[index]
            },
            body: p,
          });
        })
      );
      // const responses = await Promise.all(uploadPromises);
      console.log(`done        ${Date()}`);
      const allOk = responses.every(r => r.ok);
      if (allOk) {
        setMessage('Photos uploaded successfully!');
        setPhotos([]);
        setCaptions([]);
        if (onUpload) {
          onUpload();
        } else {
          router.push('/photos?tab=wedding');
        }
      } else {
        setMessage('Failed to upload one or more photos. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      setMessage('Please select at least one photo to upload.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const fileNames = photos.map(f => f.name);
      console.log(`uploading   ${Date()}`);
      // Submit each photo in parallel
      const responses = await Promise.all(
        photos.map(async (photo, index) => {
          const resp = await fetch(
            `https://r2-worker.hannahjackwedding.com/upload?filename=${encodeURIComponent(photo.name)}&contentType=${encodeURIComponent(photo.type)}`,
            {headers: {'x-hjwedding-userId': user?.userId ?? ""}}
          )
          if (!resp.ok) {
            const errorData = await resp.json()
            throw new Error(`Failed to get upload URL: ${errorData.error || resp.statusText}`)
          }
      
          const { url, key } = await resp.json() // Get URL and the final object key
          console.log(`Received presigned URL for key: ${key}`)
      
          const p = await imageCompression(photo, {
            maxSizeMB: 1, // adjust as needed
            maxWidthOrHeight: 1920, // adjust as needed
            useWebWorker: true,
          });

          return await fetch(url, {
            method: 'PUT',
            body: p,
            headers: {
              // Content-Type must match what was used to generate the presigned URL if specified
              'Content-Type': p.type,
              // You might not need 'Content-Length' as fetch often handles it,
              // but some S3-compatible services might require it.
              'Content-Length': p.size.toString(),
            },
          });
        })
      );
      // const responses = await Promise.all(uploadPromises);
      console.log(`done        ${Date()}`);
      const allOk = responses.every(r => r.ok);
      if (allOk) {
        setMessage('Photos uploaded successfully!');
        setPhotos([]);
        setCaptions([]);
        if (onUpload) {
          onUpload();
        } else {
          router.push('/photos?tab=wedding');
        }
      } else {
        setMessage('Failed to upload one or more photos. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-5 max-w-md mx-auto">
      { !userLoaded
        ? <CreateAccount user={user} setUser={setUser} onSuccess={() => setUserLoaded(true)}/>
        : <>
        <h1 className="text-2xl font-bold mb-4">Add Your Photos</h1>
        <div className="mb-2 text-sm text-gray-500 text-center">Be patient! For best results, please upload no more than 10 photos at a time.</div>
        {isLoading && <div className="text-center text-indigo-600">Uploading...</div>}
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
                disabled={isLoading}
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
                        disabled={isLoading}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Submit'}
            </button>
            {/* <button
              onClick={(e) => handleSubmit2(e)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Submit (v2)'}
            </button> */}
          </form>
        </>
      }
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
}
