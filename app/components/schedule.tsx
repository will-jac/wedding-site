import { Link } from "@mui/material";

export default function Schedule() {
    return <section id="schedule" className="pt-5">
        <h3 className="text-2xl font-extrabold text-[#879b88]">Schedule of Events</h3>
        <p className="indent-10"><b>Saturday, May 31:</b></p>
        <ul>
            <li>9:00 AM - Optional walk through the <Link href="https://maps.app.goo.gl/aAgrJAFJ7D298wi59">UW Arboretum</Link> (all are welcome!)</li>
            <li>5:00 PM - Rehearsal dinner (wedding party and immediate family only)</li>
            <li>7:00 PM - Welcome party at Vilas Park (all are welcome!)</li>
        </ul>
        <br></br>
        <p className="indent-10"><b>Sunday, June 1:</b></p>
        <ul>
            <li>3:30 PM - Guests start arriving at the venue</li>
            <li>4:00 PM - Ceremony</li>
            <li>4:30 PM - Social hour</li>
            <li>5:30 PM - Dinner</li>
            <li>6:30 PM - Dancing and Reception</li>
            <li>9:00 PM - Venue closes</li>
        </ul>
    </section>
}
