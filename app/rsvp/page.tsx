'use client'
import { useState, useEffect } from 'react';

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

    return <HomeLayout>
    {result === 'success'
        ? <Stack spacing={2}>
            <p>Thank you for RSVP'ing!</p>
            <p>We can't wait to see you on June 1, 2025</p>
            <div className="flex justify-center">
                <Button href="/#faq">Next, check out the FAQ</Button>
            </div>
        </Stack>
        : attendeeGroup === null
            ? <RsvpSearch foundReservation={(ag: AttendeeGroup) => setAttendeeGroup(ag)}/>
            : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} result={result} setResult={setResult} />
    }
    </HomeLayout>;
}