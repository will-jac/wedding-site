const normalizeSrc = (src: string) => {
    console.log('normalizeSrc', src);
    return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
    src,
    width,
    height,
    quality,
}: { src: string; width: number; height: number; quality?: number }) {
    // if (process.env.NODE_ENV === "development") {
    //     return src;
    // }
    const params = [`width=${width}`];
    params.push(`height=${height}`);
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(",");
    return `https://photos.hannahjackwedding.com/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}