'use client';
import HomeLayout from '../components/HomeLayout';

export default function Travel() {

    return <HomeLayout headerImageSrc="Hannah-Jack-ENG-AKP-6.17.24-144.jpg">

        <h2 className="pt-5 text-2xl font-extrabold text-[#879b88]">Travel</h2>
        <h3 id="lodging" className="pt-5 text-1xl font-extrabold text-[#879b88]">Lodging</h3>
        <p>We have booked a block of rooms at two hotels:</p>
        <a href="https://www.hilton.com/en/hotels/msnmugi-hilton-garden-inn-madison-downtown/">
            <p><b>Hilton Garden Inn Madison Downtown</b></p>
        </a>
        <p className="indent-8">770 Regent St, Madison, WI</p>
        <a href="https://www.hilton.com/en/hotels/msnmadt-doubletree-madison-east/">
            <p><b>Doubletree by Hilton East Madison</b></p>
        </a>
        <p className="indent-8">4402 E Washington Ave, Madison, WI</p>
        
        <p>The Hilton Garden in is downtown, perfect for exploring Madison and hanging out with others before the wedding. The Doubletree is closer to the airport and the venue, and is a bit cheaper.</p>
        <p>We don't currently have bookable links--check back again soon! We'll also send you an email when we have it.</p>
        
        <h3 id="travel" className="pt-5 text-1xl font-extrabold text-[#879b88]">Getting to Madison</h3>
        <p>We recommend flying into the Madison airport (MSN). It can sometimes be cheaper to fly into Chicago, Rockford, or Milwaukee and rent a car from there or take a bus to Madison--if you do, the bus runs of a regular schedule and tickets are valid for 1 year after purchase, so don't worry if you get delayed and have to take a later bus. The bus drops off in downtown Madison, so you'll need to take a taxi or rideshare to your hotel from there.
        </p>
        
        <h3 id="madison" className="pt-5 text-1xl font-extrabold text-[#879b88]">Things to do in Madison</h3>
        <p>Some of our favorite things to do in Madison:</p>
        <ul className="list-disc pl-5">
            <li>Visit the Wisconsin State Capitol</li>
            <li>Explore the University of Wisconsin-Madison Campus--the Memorial Union Terrace has free live music on the lake most days!</li>
            <li>Go to the Olbrich Botanical Gardens</li>
            <li>Get a beer and enjoy the lake at the Olbrich Biergarten</li>
            <li>Check out the Madison Museum of Contemporary Art</li>
            <li>Walk or bike around Lake Monona</li>
            <li>Visit the Henry Vilas Zoo (free!)</li>
            <li>Go to the Dane County Farmers' Market on Saturday morning, on the Capital square. It's the biggest producure-only farmer's market in the nation!</li>
            <li>Enjoy the UW Arboretum (it's where we had our first date in Madison!)</li>
            <li>Visit the Chazen Museum of Art</li>
            <li>Take a brewery tour</li>
        </ul>

        <h3 id="food" className="pt-5 text-1xl font-extrabold text-[#879b88]">Some of our favorite restaurants</h3>
        <ul className="list-disc pl-5">
            <li>Fabiolas</li>
            <li>Everly</li>
            <li>Graze</li>
            <li>Bar Corallini</li>
            <li>Green Owl</li>
            <li>Maharani</li>
            <li>Ian's Pizza</li>
            <li>Ahan</li>
            <li>Ha Long Bay</li>
            <li>Sardine</li>
        </ul>
        
        
    </HomeLayout>
}