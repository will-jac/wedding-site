import bg from "../../public/background2.png";
import Title from './title';
import Menu from './menu';
import { Link } from "@mui/material";
import Image from "next/image";
import { landscapeLoader } from '../components/gallery/views';

function Layout(props: {isGalleryWidth?: boolean, children: any}) {
    // Use a wider layout if isGalleryWidth and phone is in landscape
    // Tailwind: add max-w-full for landscape on small screens
    const width = props.isGalleryWidth 
        ? "max-w-full md:max-w-2x lg:max-w-4xl xl:max-w-6xl"
        : "max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl";
    return (
        <div className="flex justify-center items-center">
            <div className={`bg-white min-h-screen ${width}`}>
            {/* <div className="bg-white max-w-xs lg:max-w-xl min-h-screen"> */}
                {props.children}
            </div>
        </div>
    );
}

function Background(props: any) {
    return (
        <div
            className="background bg-repeat w-full"
            style={{
                backgroundImage: `url(${bg.src})`
            }}
        >
            {props.children}
        </div>
    );
}

function HeaderImage(props: {src: string, width?: number, height?: number, loader?: any}) {
    'use client';
    return (
        <div className="flex justify-center">
            <Image
                src={props.src}
                width={props.width ?? 1024}
                height={props.height ?? 720}
                alt="Picture of Hannah and Jack"
                className="object-cover"
                loader={props.loader ?? landscapeLoader}
            />
        </div>
    );
}

function FooterImage() {
    'use client';
    return (
        <div className="flex justify-center py-10">
            <Image
                src="engagement/Hannah-Jack-ENG-AKP-6.17.24-24.jpg"
                width={720}
                height={420}
                alt="Picture of Hannah and Jack"
                className="object-cover w-2/3"
                loader={landscapeLoader}
            />
        </div>
    );
}


export default function HomeLayout(props: {
    noShowMenu?: boolean, 
    isGalleryWidth?: boolean, noShowFooterImage?: boolean, 
    headerImageSrc?: string, headerImageWidth?: number, headerImageHeight?: number, headerImageLoader?: any,
    children: any
}) {

    // Use a narrower gutter (px-2) if isGalleryWidth is true (photo page), else default (px-5)
    const contentPadding = props.isGalleryWidth ? 'px-0' : 'px-5';

    return <Background>
        <Layout isGalleryWidth={props.isGalleryWidth}>
            <div className='top-0 pt-8 px-5 md:px-10 xl:px-20 text-center bg-white'>
                <Link href="/" underline="none">
                    <Title>Hannah & Jack</Title>
                </Link>
            </div>
            {props.noShowMenu ? null : <Menu />}
            <div className={contentPadding}>
                {props.headerImageSrc ? <HeaderImage src={props.headerImageSrc} width={props.headerImageWidth} height={props.headerImageHeight} loader={props.headerImageLoader} /> : null}
                {props.children}
            </div>
            {props.noShowFooterImage ? null : <FooterImage /> }
            <footer className="flex justify-end bg-[#879b88]" id="about">
                <div className="mx-20 my-5">
                    <p>Made by Jack</p>
                    <p><Link href="https://github.com/will-jac/wedding-site" rel="noopener noreferrer">Source Code</Link></p>
                    <p><Link href="/account">Your Account</Link></p>
                </div>
            </footer>
        </Layout>
    </Background>
}