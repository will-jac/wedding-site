import HomeLayout from './components/header';
import Image from "next/image";
import banner from "./home/banner.jpg";
import FAQ from "./components/faq";
import Story from "./components/story";
import Schedule from "./components/schedule";
import Location from "./components/location";
import Hotel from "./components/hotel";
import Travel from "./components/travel";

export default function Main() {

  return <div>
  <HomeLayout>
    <p>We're getting married!!!</p>
    <p>Come join us in Madison, WI on June 1, 2025 to celebrate</p>
    <div className="p-5 flex flex-col items-center justify-center">
      <Image
        src={banner}
        width={500}
        alt="Picture of Hannah and Jack Kissing :)"
        className="object-cover"
        priority
      />
    </div>

    <Story/>

    <Location/>

    <Schedule/>

    <Hotel/>

    <Travel/>

    <FAQ/>

    <div className="pb-10"/>
  </HomeLayout>
  <section className="flex justify-end bg-emerald-300" id="about">
    <div className="mx-20 my-5">
      <p>Made by Jack</p>
      <p>Deployed with Vercel</p>
      <a 
        href="https://github.com/will-jac/wedding-site" 
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        rel="noopener noreferrer">Source Code</a>
    </div>
  </section>
</div>
}
