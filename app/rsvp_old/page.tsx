'use client';
import { useState, useRef } from 'react';
import { FormGroup, FormControl, FormLabel, TextField, Button, CircularProgress } from '@mui/material';
import { InputLabel, Select, MenuItem, Stack, Grid2} from '@mui/material';
import HomeLayout from '../components/header';
import { LinkButton } from '../components/menu';
import Title from '../components/title';


function WillAttend(props: any) {
    const {attending, setAttending} = props;

    return <FormControl fullWidth className="p-20">
        <InputLabel>Will Attend</InputLabel>
        <Select
            value={attending}
            label="Will Attend"
            // booleans are not supported here :(
            onChange={(e) => {e.preventDefault(); setAttending(e.target.value)}}
        >
            <MenuItem value={"yes"}>Yes, I'll be there!</MenuItem>
            <MenuItem value={"no"}>No, I cannot make it</MenuItem>
        </Select>
    </FormControl>;
}

function Diet(props: any) {
    const {diet, setDiet} = props;

    return <FormControl>
        <InputLabel>Diet</InputLabel>
        <Select
            value={diet}
            label="Diet"
            onChange={(e) => {e.preventDefault(); setDiet(e.target.value);}}
        >
            <MenuItem value={"none"}>None</MenuItem>
            <MenuItem value={"vegetarian"}>Vegetarian</MenuItem>
            <MenuItem value={"vegan"}>Vegan</MenuItem>
            <MenuItem value={"gluten"}>Gluten Free</MenuItem>
            <MenuItem value={"dairy"}>Dairy Free</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
        </Select>
    </FormControl>;
}


function Form(props: any) {
    const [attending, setAttending] = useState('yes');
    const [attendees, setAttendees] = useState([{name: '', diet:'none'}]);

    function updateAttendees(index: number, name: string | null, diet: string | null) {
        let nextAttendees = attendees;
        
        // add the new input only if we need to
        if (name !== '' && attendees[index].name === '' && index === attendees.length-1) {
            nextAttendees = [...attendees, {name: '', diet: ''}];
        }
        // update the attendee we're editing
        nextAttendees = nextAttendees.map((a, i) => {
            if (i === index) {
                return {name: name ?? a.name, diet: diet ?? a.diet};
            }
            return a;
        })

        setAttendees(nextAttendees);
    }

    function filterAttendees() {
        const nextAttendees = attendees.filter(
            (a) => a.name !== ''
        ); // remove empty ones if we're filtering
        
        // always keep a blank one at the end
        setAttendees([...nextAttendees, {name: '', diet: ''}]);

    }

    return <Stack spacing={1}>
        <p>First things first: Are you able to attend the wedding?</p>
        <p><span className="font-bold">Location: </span>Harvest Moon Pond, N 3540, State Rd 22, Poynette, WI 53955</p>
        <p><span className="font-bold">Date: </span>June 1, 2025</p>
        <WillAttend attending={attending} setAttending={setAttending} />

        <p>Please list the names of everyone who is RSVP'ing, along with any dietary restrictions:</p>
        {attendees.map((a, index) => {
            return <Stack spacing={1} direction="row" key={index}>
                <TextField 
                    label="Name" variant="outlined"
                    value={a.name}
                    onChange={(e) => {
                        e.preventDefault();
                        updateAttendees(index, e.target.value, null);
                    }}
                    onBlur={(e) => {
                        e.preventDefault();
                        filterAttendees();
                    }}
                />
                <Diet diet={a.diet} setDiet={(d: string) => updateAttendees(index, null, d)}/>
            </Stack>
        })}


        

        {props.children}
    </Stack>
}


export default function RSVP() {
    const [status, setStatus] = useState("");
    const formRef = useRef(null);
    const submitURL = "https://script.google.com/macros/s/AKfycbygpQDG1gsD987SeX146tA7ddX0Cbf_N3hmxpUR2sMl5SmkUsoIWiVlUmTRPAKRISu7/exec";

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        fetch(submitURL, {
            method: 'post',
            body: new FormData(formRef.current as unknown as HTMLFormElement),
        }).then((res) => {
            console.log(res);
            if (!res.ok) {
                setStatus('error');
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            setStatus('done');
        });
    }

    return <HomeLayout>
        <div className='top-0 pt-8 md:px-20 text-center bg-white'>
            <Title>RSVP</Title>
        </div>
        <form
            id="rsvp-form" 
            onSubmit={submit}
            ref={formRef}
            className="flex flex-col"
        >
            <Form>
                {status === ''
                    ? <button type="submit" id="submit_button" value="Submit request" >Submit</button>
                    : null}
                {status === 'sending' ? <CircularProgress /> : null}
                {status === 'error' ? <p>Something went wrong! Please let Jack know!</p> : null}
                {status === 'done'
                    ? <div>
                        <p>RSVP Sent! We're excited to see you!</p>
                        <LinkButton text="Read more about our wedding!" link="/" />
                    </div>
                    : null}
            </Form>
        </form>
    </HomeLayout>;
}