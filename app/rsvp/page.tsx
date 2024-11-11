'use client'
import { useState, useRef } from 'react';

import HomeLayout from '../components/header';
import RsvpForm from './attendeeForm';
import RsvpSearch from './attendeeSearch';

import { AttendeeGroup, Attendee } from '../components/db';
import { Button, Stack } from '@mui/material';
import { LinkButton } from '../components/menu';

export default function RSVPPage() {
    const [attendeeGroup, setAttendeeGroup] = useState(null as null | AttendeeGroup);
    const [result, setResult] = useState('');

    return <HomeLayout>
        {(true || result === 'success')
            ? <Stack spacing={2}>
                <p>Thank you for RSVP'ing!</p>
                <p>We can't wait to see you on June 1, 2025</p>
                <div className="flex justify-center">
                    <LinkButton text="Next, check out the FAQ" link="/#faq"/>
                </div>
            </Stack>
            : attendeeGroup === null
                ? <RsvpSearch foundReservation={(ag: AttendeeGroup) => setAttendeeGroup(ag)}/>
                : null
                // : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} result={result} setResult={setResult} />
    }
    </HomeLayout>;
}