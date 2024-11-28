import bg from "../../public/background2.png";
import Title from './title';
import Menu from './menu';
import { Link } from "@mui/material";

function Layout(props: {isGalleryWidth?: boolean, children: any}) {
    const width = props.isGalleryWidth 
        ? "max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-7xl" 
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


export default function HomeLayout(props: {noShowMenu?: boolean, isGalleryWidth?: boolean, children: any}) {

    return <Background>
        <Layout isGalleryWidth={props.isGalleryWidth}>
            <div className='top-0 pt-8 px-5 md:px-10 xl:px-20 text-center bg-white'>
                <Link href="/" underline="none">
                    <Title>Hannah & Jack</Title>
                </Link>
            </div>
            {props.noShowMenu ? null : <Menu />}
            <div className="px-5 pb-52">
                {props.children}
            </div>
            <footer className="flex justify-end bg-[#879b88]" id="about">
                <div className="mx-20 my-5">
                <p>Made by Jack</p>
                <Link 
                    href="https://github.com/will-jac/wedding-site" 
                    // className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    rel="noopener noreferrer">Source Code</Link>
                </div>
            </footer>
        </Layout>
    </Background>
}