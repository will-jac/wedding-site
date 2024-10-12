import HomeLayout from './components/header';
import Image from "next/image";
import banner from "./home/banner.jpg";

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
    <section id="story" className="pt-5">
      <h2 className="text-2xl font-extrabold text-emerald-600">Our Story</h2>
      <p>we met when we loved each other :)</p>
    </section>

    <section id="location" className="pt-5">
      <h2 className="text-2xl font-extrabold text-emerald-600">Location</h2>
      <p>We are getting married at <a href="https://harvestmoonpond.com/" 
        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        rel="noopener noreferrer">Harvest Moon Pond</a>. It's about 20 minutes by car from Madison.
        We'll have a shuttle from the hotel to and from the venue, but we recommend renting a car if you're 
        staying somewhere else or think you might want to leave early.
      </p>
      <p>Harvest Moon Pond is an old dairy farm that's been turned into a wedding venue.
        We picked it because we love the large willow trees, beautiful interior, and flexible spaces for the unpredictable Wisconsin weather.
      </p>
    </section>

    <section id="timeline" className="pt-5">
      <h2 className="text-2xl font-extrabold text-emerald-600">Timeline</h2>
      <p>We plan to have our ceremony outside under the willow trees, a cocktail hour on the patio, then move inside for dinner and dancing.</p>
    </section>

    <section id="faq" className="pt-5">
      <h2 className="text-2xl font-extrabold text-emerald-600">FAQ</h2>
      <div className="pl-5">
        <h3 className="text-xl pt-2">Question 1</h3>
        <p>answer!!!</p>
        <h3 className="text-xl pt-2">Question 2</h3>
        <p>answer!!!</p>
      </div>
    </section>

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
