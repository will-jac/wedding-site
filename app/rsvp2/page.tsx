'use client'
import { useState, useRef } from 'react';

import Header from '../components/header';
import RsvpForm from './attendeeForm';
import RsvpSearch from './attendeeSearch';

import { AttendeeGroup, Attendee } from '../components/db';

export default function RSVPPage() {
    const [attendeeGroup, setAttendeeGroup] = useState(null as null | AttendeeGroup);

    return <Header>
        {(attendeeGroup === null)
            ? <RsvpSearch foundReservation={(ag: AttendeeGroup) => setAttendeeGroup(ag)}/>
            : <RsvpForm attendeeGroup={attendeeGroup} setAttendeeGroup={setAttendeeGroup} />
        }

    </Header>;

    
}