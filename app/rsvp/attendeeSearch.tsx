'use client'
import { useState } from 'react';

import { FormGroup, FormControl, FormControlLabel, FormLabel, TextField, Button, CircularProgress } from '@mui/material';
import { InputLabel, Select, MenuItem, Checkbox, Stack, Divider} from '@mui/material';

import { uploadAttendeesFromFile, lookupRsvpByName, AttendeeGroup, Attendee } from '../components/db';

export default function RsvpSearch(props: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [ranSearch, setRanSearch] = useState(false);
    const [attendeeGroups, setAttendeeGroups] = useState([] as AttendeeGroup[]);

    return <>
        {process.env.NODE_ENV === 'production' ? null 
            : <Button onClick={() => uploadAttendeesFromFile()}>
                Upload Attendees to Database (WARNING WILL OVERWRITE)
            </Button>
        }

        <Stack spacing={1} className='py-5'>  
            <Stack spacing={1} direction='row'>  
                <TextField variant="outlined" required={true}
                    label="First Name" value={firstName}
                    onChange={(e) => { e.preventDefault(); setFirstName(e.target.value); }}
                />
                <TextField variant="outlined" required={true}
                    label="Last Name" value={lastName}
                    onChange={(e) => { e.preventDefault(); setLastName(e.target.value); }}
                />
            </Stack>

            <TextField variant="outlined" required={true}
                label="Password" value={password}
                onChange={(e) => { e.preventDefault(); setPassword(e.target.value); }}
            />
            <Button variant='contained'
                onClick={async () => {
                    const ag = await lookupRsvpByName(firstName, lastName);
                    if (ag.length === 1) {
                        props.foundReservation(ag[0]);
                        return;
                    }
                    setRanSearch(true);
                    setAttendeeGroups(ag);
                }}
            >
                Lookup Reservation
            </Button>

            { (ranSearch) ? 
                (attendeeGroups.length === 0) 
                    ? <p>No matching name was found on the list. Please try a different name (note: your name must EXACTLY match as it was entered on the save the date, or whatever you changed it to</p> 
                    : <>
                        <Divider flexItem className='pb-5'/>
                        <p>Please select a reservation to edit:</p>
                        <Stack>
                            {attendeeGroups.map((ag) => 
                                <Button 
                                    key={ag.id}
                                    onClick={() => props.foundReservation(ag)}
                                >
                                    {ag.attendees.map((a) => <p key={a.id}>{a.first_name + ' ' + a.last_name} </p>)}
                                </Button>
                            )}
                        </Stack>
                    </>
                : null
            }

        </Stack>
    </>
}