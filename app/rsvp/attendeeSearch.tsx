'use client'
import { useState } from 'react';

import { FormGroup, FormControl, FormControlLabel, FormLabel, TextField, Button, CircularProgress } from '@mui/material';
import { InputLabel, Select, MenuItem, Checkbox, Stack, Divider} from '@mui/material';

import { uploadAttendeesFromFile, getAttendees, AttendeeGroup, Attendee } from '../components/db';

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from '../styles';

export default function RsvpSearch(props: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [attendeeGroups, setAttendeeGroups] = useState([] as AttendeeGroup[]);

    async function submitSearch() {
        setSearchStatus('searching')
        const ag = await getAttendees(firstName, lastName, password);
        if (ag == null) {
            setSearchStatus('invalid');
            return;
        }
        setSearchStatus('done');
        setAttendeeGroups(ag);
    }

    return <>
    <ThemeProvider theme={ButtonTheme}>

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
                    onKeyUp={(e) => {e.preventDefault(); if (e.key == 'Enter') {submitSearch();}}}
                />
                <TextField variant="outlined" required={true}
                    label="Last Name" value={lastName}
                    onChange={(e) => { e.preventDefault(); setLastName(e.target.value); }}
                    onKeyUp={(e) => {e.preventDefault(); if (e.key == 'Enter') {submitSearch();}}}
                />
            </Stack>

            <TextField variant="outlined" required={true}
                label="Password" value={password}
                onChange={(e) => { e.preventDefault(); setPassword(e.target.value); }}
                onKeyUp={(e) => {e.preventDefault(); if (e.key == 'Enter') {submitSearch();}}}
            />
            <Button variant='contained'
                onClick={submitSearch}
            >
                Find Invitation
            </Button>
    { 
        (searchStatus === 'searching') 
        ? <p>Searching......</p> :
        (searchStatus === 'invalid') 
        ? <p>Invalid Password</p> :
        (searchStatus === 'done') 
        ? (attendeeGroups.length === 0) 
            ? <p>No matching name was found on the list. Please try again, or <a href="mailto:jackawilliams13@gmail.com">contact us.</a></p> 
            : <>
                <Divider flexItem className='pb-5'/>
                <p>Reservation found:</p>
                <Stack spacing={1}>
                    {attendeeGroups.map((ag) => 
                        <div key={ag.id}>
                            {ag.attendees.map((a) => <p key={a.id}>{a.first_name + ' ' + a.last_name} </p>)}
                            <div className='flex justify-center'>
                                <Button variant='contained' onClick={() => props.foundReservation(ag)}>
                                    Select
                                </Button>
                            </div>
                        </div>
                    )}
                </Stack>
            </>
        : null
    }
        </Stack>
    </ThemeProvider>
    </>
}