'use client'
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { landscapeLoader } from '../components/gallery/views';

import HomeLayout from '../components/HomeLayout';
import RsvpForm from './attendeeForm';
import RsvpSearch from './attendeeSearch';

import { AttendeeGroup } from '../components/db';
import { Button, Stack } from '@mui/material';

export default function RSVPPage() {
    const [attendeeGroup, setAttendeeGroup] = useState(null as null | AttendeeGroup);
    const [result, setResult] = useState('');

    // restore app state on page load
    useEffect(() => {
        const data = window.localStorage.getItem('AttendeeGroup');
        if ( data !== null ) setAttendeeGroup(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (attendeeGroup !== null) {
            window.localStorage.setItem('AttendeeGroup', JSON.stringify(attendeeGroup));
        }
    }, [attendeeGroup]);

    function clearAttendeeGroup() {
        setAttendeeGroup(null);
        window.localStorage.removeItem('AttendeeGroup');
    }

    return <HomeLayout noShowFooterImage={true}>
    {result === 'success'
        ? <Stack spacing={2}>
            <p>Thank you for RSVP'ing!</p>
            <p>We can't wait to see you on June 1, 2025</p>
            <div className="flex justify-center">
                <Button href="/faq">Next, check out the FAQ</Button>
            </div>
        </Stack>
        : attendeeGroup === null
            ? <RsvpSearch foundReservation={(ag: AttendeeGroup) => setAttendeeGroup(ag)}/>
            : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} clearAttendeeGroup={clearAttendeeGroup} result={result} setResult={setResult} />
    }
    <div className="flex justify-center py-10">
        <Image
            src="engagement/Hannah-Jack-ENG-AKP-6.17.24-6.jpg"
            width={720}
            height={1024}
            alt="Picture of Hannah and Jack"
            className="object-cover w-2/3"
            loader={landscapeLoader}
        />
    </div>
    </HomeLayout>;
}