'use server';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { ImageProps } from './types';
import { kv } from "@vercel/kv";
import pLimit from 'p-limit';
import { User } from '../../user';

// TODO: use the cloudflare worker to get the images

const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: 'https://8ce63ff931615d248423805c4908e332.r2.cloudflarestorage.com/',
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ?? "" // stupid type safety
    }
});

const limit = pLimit(100); // Limit to 100 simultaneous requests

export async function getImagesFromCloudflare(bucket: string) {
    console.log("getting all images from Cloudflare ($$$)");
    // list objects in bucket
    const command = new ListObjectsCommand({
        Bucket: bucket
    });

    const response = await s3Client.send(command);
    
    const images = await Promise.all(response?.Contents
        ?.map(item => 
            limit(async () => {
                process.stdout.write(".");
                const resp = await fetch(`https://photos.hannahjackwedding.com/cdn-cgi/image/format=json/${item.Key}`);
                const imgJson = await resp.json();
                return {
                    key: item.Key,
                    portrait: imgJson['height'] > imgJson['width']
                } as ImageProps;
            })
        )
        .filter(key => key !== undefined) ?? []);

    // photos have names in the format <prefix>-<number>.<ext>
    // sort on the number and the prefix
    images.sort((a, b) => {
        const aName = a.key.split('-');
        const bName = b.key.split('-');
        const aPrefix = aName.slice(0, aName.length - 1).join('-');
        const bPrefix = aName.slice(0, bName.length - 1).join('-');
        const aNum = parseInt(aName[aName.length - 1].split('.')[0]);
        const bNum = parseInt(bName[bName.length - 1].split('.')[0]);
        if (aPrefix !== bPrefix) {
            return aPrefix.localeCompare(bPrefix);
        }
        return aNum - bNum;
    });
    // save to KV
    const resp = await kv.set(`photos:${bucket}`, images);
    console.log(resp);

    return images;
}

// TODO: figure out edge caching so this doesn't need to be recomputed
export async function getImagesFromKV(bucket: string) {
    const images = await kv.get(`photos:${bucket}`) as ImageProps[];
    return images;
}

export async function getImagesFromWorker(prefix: string = "") {
    const resp = await fetch("https://r2-worker.jackawilliams13.workers.dev?prefix=" + prefix, {cache: 'no-store'});
    console.log(resp);
    const imgList: ImageProps[] = (await resp.json()).map((obj: any) => (
        { 
            caption: obj?.customMetadata?.caption ?? "", 
            userId: obj?.customMetadata?.userId ?? "",
            ...obj 
        }
    ));
    return imgList
}

export async function getUsers() {
    const resp = await fetch("https://r2-worker.jackawilliams13.workers.dev/users");
    if (resp.status != 200) {
        console.log("resp was not 200")
        return {};
    }
    const r = await resp.json() as Record<string, User>;
    console.log(r);
    return r
    //     try {
    // }
    // catch {
    //     return {};
    // }
}

export default async function getImages(prefix="engagement") {
    // let images = await getImagesFromKV(bucket)
    // if (images == null || images.length == 0)
    // {
    //     return getImagesFromCloudflare(bucket);
    // }
    if (prefix == "wedding") {
        prefix = "gallery";
    }
    return await getImagesFromWorker(prefix)
}