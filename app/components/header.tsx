import bg from "../../public/background2.png";
import Title from './title';
import Menu from './menu';

function Layout(props: any) {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white max-w-xs md:max-w-md lg:max-w-2xl">
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


export default function Header(props: any) {

    return <Background>
        <Layout>
            <div className='top-0 pt-8 md:px-20 text-center bg-white'>
                <Title>Jack & Hannah</Title>
            </div>
            <div className='sticky top-0 bg-white'>
                <Menu />
            </div>
            <div className="px-10">
                {props.children}
            </div>
        </Layout>
    </Background>
}