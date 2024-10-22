'use client'
import { useState, useRef } from 'react';

import { FormGroup, FormControl, FormControlLabel, FormLabel, TextField, Button, CircularProgress } from '@mui/material';
import { InputLabel, Select, MenuItem, Checkbox, Stack, Divider} from '@mui/material';

import Header from '../components/header';

import { uploadAttendees, submitRsvp, AttendeeGroup, Attendee } from '../components/db';

function AttendeeForm(props: {updateAttendee: any, removeAttendee: any, attendee: Attendee}) {
    const {updateAttendee, removeAttendee, attendee} = props
    const {first_name, last_name, diet, is_attending, is_plus_one} = attendee;

    return <Stack spacing={1}>
        <TextField 
            label="First Name" value={first_name}
            variant="outlined" required={true}
            onChange={(e) => {
                e.preventDefault();
                updateAttendee({...attendee, first_name: e.target.value});
            }}
        />
        <TextField 
            label="Last Name" value={last_name}
            variant="outlined" required={true}
            onChange={(e) => {
                e.preventDefault();
                updateAttendee({...attendee, last_name: e.target.value});
            }}
        />
        <TextField 
            label="Dietary Preference" value={diet}
            variant="outlined" required={false}
            onChange={(e) => {
                e.preventDefault();
                updateAttendee({...attendee, diet: e.target.value});
            }}
        />
        <Stack spacing={1} direction='row'>
            <FormGroup>
                <FormControlLabel required control={
                    <Checkbox checked={is_attending??true} onChange={() => {
                        updateAttendee({...attendee, is_attending: !is_attending});
                    }}/>
                } label="Is Attending" />
            </FormGroup>
            <FormGroup>
                <FormControlLabel required control={
                    <Checkbox checked={is_plus_one??false} onChange={() => {
                        updateAttendee({...attendee, is_plus_one: !is_plus_one});
                    }}/>
                } label="Is Plus One" />
            </FormGroup>
            <Button variant='outlined'
                onClick={e=>{e.preventDefault(); removeAttendee();}}
            >
                Remove
            </Button>
        </Stack>
        <Divider flexItem className='py-1'/>
    </Stack>
}

let idValue = 0;

function newAttendee(): Attendee {
    idValue += 1;
    return {
        id: idValue,
        first_name: '',
        last_name: '',
        diet: '',
        is_attending: true,
        is_plus_one: false,
    }
}

function AddAttendeeButton(props: any) {
    return <Button variant='outlined' 
        onClick={e=>{
            e.preventDefault(); 
            // if (canAddAttendee(props.attendees)) {
            props.setAttendees([...props.attendees, newAttendee()])
            // }
        }}
    >
        Add an Attendee
    </Button>
}

function SubmitButton(props: {form: AttendeeGroup}) {
    let submitAction = submitRsvp.bind(null, props.form); 

    return <Button variant='contained'
        onClick={async () => {
            console.log('submitting', props.form);
            await submitAction();
            // await submitRSVP(null);
        }}
    >
        Submit RSVP
    </Button>
}

export default function RsvpForm(props: {attendeeGroup: AttendeeGroup, setAttendeeGroup: any}) {
    const {attendeeGroup, setAttendeeGroup} = props;
    const {id, email, comment, attendees} = attendeeGroup;
    // const [email, setEmail] = useState('');
    // const [comment, setComment] = useState('');
    // const [attendees, setAttendees] = useState([] as Attendee[]);

    function updateAttendee(id: number) {
        return (attendee: Attendee) => {
            const nextAttendees = attendees.map((aa) => {
                if (aa.id === id) return attendee;
                return aa;
            })
            setAttendeeGroup({...attendeeGroup, attendees: nextAttendees});
        }
    }
    function removeAttendee(id: number) {
        return () => {
            const nextAttendees = attendees.filter((aa) => aa.id !== id); 
            setAttendeeGroup({...attendeeGroup, attendees:[...nextAttendees]});
        }
    }

    return <>
        
        <p>Please fill out the form below for each group attending. You can fill it out as a group, or have each person fill it out individually.</p>
        
        <Stack spacing={1} className='py-5'>  
            <TextField variant="outlined" required={true}
                label="E-mail" value={email} type="email"
                onChange={(e) => setAttendeeGroup({...attendeeGroup, email: e.target.value})}
            />
            <Divider flexItem className='pb-5'/>

            <p>For each attendee:</p>
            {attendees.map((a) => {
                return <AttendeeForm 
                    key={a.id} attendee={a}
                    updateAttendee={updateAttendee(a.id)}
                    removeAttendee={removeAttendee(a.id)}
                />
            })}
            <AddAttendeeButton attendees={attendees} setAttendees={(a: Attendee[]) => setAttendeeGroup({...attendeeGroup, attendees:a})}/>

            <Divider flexItem className='py-5'/>
            <p>Feel free to leave us a nice comment (or tell us that something isn't working!)</p>
            <TextField variant="outlined" required={false} multiline minRows={2} maxRows={10}
                label="Comment" value={comment}
                onChange={(e) => setAttendeeGroup({...attendeeGroup, comment: e.target.value})}
            />

            <SubmitButton form={
            {
                id: id,
                attendees: attendees,
                email: email,
                comment: comment,
                hotel: null
            }
            }/>
        </Stack>

    </>
}