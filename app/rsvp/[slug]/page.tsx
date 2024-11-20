'use client'
import { useState, useEffect } from 'react';

import HomeLayout from '../../components/header';
import RsvpForm from '../attendeeForm';

import { AttendeeGroup, getAttendeeGroup } from '../../components/db';
import { Stack } from '@mui/material';
import { LinkButton } from '@/app/components/menu';

export default function RSVPPage({ params }: { params: { slug: string } }) {
    const [attendeeGroup, setAttendeeGroup] = useState(null as null | AttendeeGroup);
    const [result, setResult] = useState('');

    useEffect(() => {
        console.log('fetching data for slug', params.slug);
        const fetchData = async () => {
            setAttendeeGroup(await getAttendeeGroup(params.slug));
        };
        fetchData();
    }, [params.slug]);

    return <HomeLayout>
        {(attendeeGroup === null)
            ? <p>Loading...</p>
            : result === 'success'
                ? <Stack spacing={2}>
                    <p>Thank you for RSVP'ing!</p>
                    <p>We can't wait to see you on June 1, 2025</p>
                    <div className="flex justify-center">
                        <LinkButton text="Next, check out the FAQ" link="/#faq"/>
                    </div>
                </Stack>
                : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} result={result} setResult={setResult} />
    }

    </HomeLayout>;

    
}