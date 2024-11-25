'use server';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { ImageProps } from './types';

// TODO: use the cloudflare worker to get the images

const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: 'https://8ce63ff931615d248423805c4908e332.r2.cloudflarestorage.com/',
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "" // stupid type safety
    }
});

export default async function getImages(bucket = "photos") {
    // list objects in bucket
    const command = new ListObjectsCommand({
        Bucket: bucket
    });

    const response = await s3Client.send(command);
    const images = await Promise.all(response?.Contents
        ?.map(async item => {
            const resp = await fetch(`https://photos.hannahjackwedding.com/cdn-cgi/image/format=json/${item.Key}`);
            const imgSize = await resp.json();
            return {
                key: item.Key,
                width: (imgSize['width'] ?? 0) as number,
                height: (imgSize['height'] ?? 0) as number,
                portrait: imgSize['height'] > imgSize['width']
            } as ImageProps;
        })
        .filter(key => key !== undefined) ?? []);
        
    return images;
}