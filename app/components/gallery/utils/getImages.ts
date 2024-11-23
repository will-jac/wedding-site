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
    const images = response?.Contents
        ?.map(item => {
            return item.Key;
            // return {
            //     key: item.Key
            // } as ImageProps;
        })
        .filter(key => key !== undefined) ?? [];
        
    return images;
}