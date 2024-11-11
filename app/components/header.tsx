import bg from "../../public/background2.png";
import Title from './title';
import Menu from './menu';

function Layout(props: any) {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white min-h-screen max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
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


export default function HomeLayout(props: any) {

    return <Background>
        <Layout>
            <div className='top-0 pt-8 px-5 md:px-10 xl:px-20 text-center bg-white'>
                <Title>Jack & Hannah</Title>
            </div>
            {/* <div className='sticky top-0 bg-white'> */}
                <Menu />
            {/* </div> */}
            <div className="px-5">
                {props.children}
            </div>
        </Layout>
    </Background>
}