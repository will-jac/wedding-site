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
    console.log(`starting form.... ${Date()}`)
    try {
      // Compress each photo before encoding
      const fileNames = photos.map(f => f.name);
      const compressedPhotos = await Promise.all(
        photos.map(photo => imageCompression(photo, {
          maxSizeMB: 1, // adjust as needed
          maxWidthOrHeight: 1920, // adjust as needed
          useWebWorker: true,
        }))
      );
      const formData = new FormData();
      compressedPhotos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo);
        formData.append(`caption_${index}`, captions[index] || '');
        formData.append(`name_${index}`, fileNames[index]);
      });  
      // // Read all compressed photos as base64 strings
      // const photoData = await Promise.all(
      //   compressedPhotos.map(photo => new Promise<string>((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onload = () => resolve(reader.result as string);
      //     reader.onerror = reject;
      //     reader.readAsDataURL(photo);
      //   }))
      // );
      // const payload = {
      //   photos: compressedPhotos,
      //   captions: captions,
      //   names: photos.map(p => p.name),
      //   types: photos.map(p => p.type)
      // };
      // const jsonString = JSON.stringify(payload);
      // const gzipped = gzip(jsonString);
      try {
        console.log(`calling fetch.... ${Date()}`)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'x-hjwedding-userKey': user?.userKey ?? "",
            'x-hjwedding-userId': user?.userId ?? "",
            // 'Content-Type': 'application/json',
            // 'Content-Encoding': 'gzip'
          },
          body: formData,
          // body: gzipped,
        });
        console.log(`resp............. ${Date()}`)
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
      } finally {
        setIsLoading(false);
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
    console.log(`starting form.... ${Date()}`)
    try {
      // Compress each photo before encoding
      const fileNames = photos.map(f => f.name);
      const compressedPhotos = await Promise.all(
        photos.map(photo => imageCompression(photo, {
          maxSizeMB: 1, // adjust as needed
          maxWidthOrHeight: 1920, // adjust as needed
          useWebWorker: true,
        }))
      );
      // Read all compressed photos as base64 strings
      const photoData = await Promise.all(
        compressedPhotos.map(photo => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(window.btoa(reader.result as string));
          // reader.onload = () => resolve((reader.result as string).split(',')[1]); // Only base64 part
          reader.onerror = reject;
          reader.readAsDataURL(photo);
        }))
      );
      const payload = {
        photos: photoData,
        captions: captions,
        names: photos.map(p => p.name),
        types: photos.map(p => p.type)
      };
      const jsonString = JSON.stringify(payload);
      const gzipped = gzip(jsonString);
      try {
        console.log(`calling fetch.... ${Date()}`)
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'x-hjwedding-userKey': user?.userKey ?? "",
            'x-hjwedding-userId': user?.userId ?? "",
            'Content-Type': 'application/json',
            'Content-Encoding': 'gzip'
          },
          body: gzipped, // Send as Uint8Array
        });
        console.log(`resp............. ${Date()}`)
        if (response.ok) {
          console.log(response.json());
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
      } finally {
        setIsLoading(false);
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
