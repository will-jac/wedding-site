'use client'
import { useState, useEffect } from 'react';

import HomeLayout from '../../components/header';
import RsvpForm from '../attendeeForm';

import { AttendeeGroup, Attendee } from '../../components/db';

export default function RSVPPage({ params }: { params: { slug: string } }) {
    const [attendeeGroup, setAttendeeGroup] = useState(null as null | AttendeeGroup);
    const [result, setResult] = useState('');

    useEffect(() => {
        // setAttendeeGroup(await getAttendeeGroup(params.slug));
    }, []);

    return <HomeLayout>
        {(attendeeGroup === null)
            ? <p>Loading...</p>
            : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} setResult={setResult} />
        }
        {result}

    </HomeLayout>;

    
}