import Image from "next/image";
import Home from './home/page';
import bg from "../public/background2.png";

function Layout(props: any) {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white">
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


export default function Main() {
  
  return <Background>
    <Layout>
      <Home/>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
      <p>Lorem Ipsum Dolor</p>
    </Layout>
  </Background>
}
