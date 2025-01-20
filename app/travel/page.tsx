'use client';
import { Link } from '@mui/material';
import HomeLayout from '../components/HomeLayout';

export default function Travel() {

    return <HomeLayout headerImageSrc="Hannah-Jack-ENG-AKP-6.17.24-144.jpg">

        <h2 className="pt-5 text-2xl font-extrabold text-[#879b88]">Travel</h2>
        <h3 id="lodging" className="pt-5 text-1xl font-extrabold text-[#879b88]">Lodging</h3>
        <p>We have booked a block of rooms at two hotels:</p>
        <a href="https://www.hilton.com/en/hotels/msnmugi-hilton-garden-inn-madison-downtown/">
            <p><b>Hilton Garden Inn Madison Downtown</b>— 
            <Link href="https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=MSNMUGI&groupCode=90L&arrivaldate=2025-05-31&departuredate=2025-06-02&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT">Booking Link</Link>
            </p>
        </a>
        <p className="indent-8">770 Regent St, Madison, WI</p>
        <a href="https://www.hilton.com/en/hotels/msnmadt-doubletree-madison-east/">
            <p><b>Doubletree by Hilton East Madison</b></p>
        </a>
        <p className="indent-8">4402 E Washington Ave, Madison, WI</p>
        
        <p>The Hilton Garden in is downtown, perfect for exploring Madison and hanging out with others before the wedding. The Doubletree is closer to the airport and the venue, and is a bit cheaper.</p>
        <p>We don't currently have bookable links—check back again soon! We'll also send you an email when we have it.</p>
        
        <h3 id="travel" className="pt-5 text-1xl font-extrabold text-[#879b88]">Getting to Madison</h3>
        <p>We recommend flying into the Madison airport (MSN). It can sometimes be cheaper to fly into Chicago, Rockford, or Milwaukee and rent a car from there or take a bus to Madison—if you do, the bus runs of a regular schedule and tickets are valid for 1 year after purchase, so don't worry if you get delayed and have to take a later bus. The bus drops off in downtown Madison, so you'll need to take a taxi or rideshare to your hotel from there.
        </p>
        
        <h3 id="madison" className="pt-5 text-1xl font-extrabold text-[#879b88]">Things to do in Madison</h3>
        <p>Some of our favorite things to do in Madison:</p>
        <ul className="list-disc pl-5">
            <li>Visit the <Link href="https://legis.wisconsin.gov/about/visit">Wisconsin State Capitol</Link></li>
            <li>Explore the University of Wisconsin-Madison Campus--the <Link href="https://union.wisc.edu/visit/terrace-at-the-memorial-union/">Memorial Union Terrace</Link> has free live music on the lake most days!</li>
            <li>Go to the <Link href="https://www.olbrich.org/">Olbrich Botanical Gardens</Link></li>
            <li>Get a beer and enjoy the lake at the <Link href="https://www.olbrichbiergarten.com/">Olbrich Biergarten</Link></li>
            <li>Check out the <Link href="https://chazen.wisc.edu/">Chazen Museum of Art</Link></li>
            <li>Walk or bike around Lake Monona</li>
            <li>Visit the <Link href="https://www.henryvilaszoo.gov/">Henry Vilas Zoo</Link> (free!)</li>
            <li>Go to the <Link href="https://dcfm.org/">Dane County Farmers' Market</Link> on Saturday morning, on the Capital square. It's the biggest producure-only farmer's market in the nation!</li>
            <li>Enjoy the <Link href="https://uwarboretum.org/">UW Arboretum</Link> (it's where we had our first date in Madison!)</li>
            <li>Visit the <Link href="https://www.mmoca.org/">Madison Museum of Contemporary Art</Link></li>
            <li>Take a brewery tour</li>
        </ul>

        <h3 id="food" className="pt-5 text-1xl font-extrabold text-[#879b88]">Some of our favorite restaurants</h3>
        <ul className="list-disc pl-5">
            <li><Link href="https://www.fabiolasmadison.com/">Fabiolas</Link></li>
            <li><Link href="https://www.everlymadison.com/">Everly</Link></li>
            <li><Link href="https://www.grazemadison.com/">Graze</Link></li>
            <li><Link href="https://www.barcorallini.com/">Bar Corallini</Link></li>
            <li><Link href="https://greenowlcafe.com/">Green Owl</Link></li>
            <li><Link href="https://ordermaharani.com/">Maharani</Link></li>
            <li><Link href="https://ianspizza.com/">Ian's Pizza</Link></li>
            <li><Link href="https://ahanmadison.com/">Ahan</Link></li>
            <li><Link href="http://sardinemadison.com/">Sardine</Link></li>
        </ul>
        
        
    </HomeLayout>
}