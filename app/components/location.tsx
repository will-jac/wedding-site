import { Link } from "@mui/material";

export default function Location() {
    return <section id="location" className="pt-5">
    <h2 className="text-2xl font-extrabold text-[#879b88]">Location</h2>
    <p className="indent-8">We are getting married at <a href="https://harvestmoonpond.com/" 
    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
    rel="noopener noreferrer">Harvest Moon Pond</a> in Poynette, WI. It's about 30 minutes north of downtown Madison by car.
    We'll likely have a shuttle from the downtown hotel to and from the venue, but we recommend renting a car or using a rideshare if you're 
    staying somewhere else or think you might want to leave early.
    </p>
    <p className="indent-8">Harvest Moon Pond is an old dairy farm that's been turned into a wedding venue.
    We picked it because we love the large willow trees, beautiful interior, and flexible spaces for the unpredictable Wisconsin weather.
    </p>
    <br/>
    <div className="align-center text-center">
        <p><b>Harvest Moon Pond</b></p>
        <p>N 3540, WI-22</p>
        <p>Poynette, WI 53955</p>
        <Link href="https://maps.app.goo.gl/LJRWp9vJbtRnw9Yd6">Directions</Link>
    </div>
</section>
}