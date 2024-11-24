'use client'

import { FormGroup, FormControl, FormControlLabel, FormLabel, TextField, Button, CircularProgress, RadioGroup, Radio, Link } from '@mui/material';
import { InputLabel, Select, MenuItem, Checkbox, Stack, Divider} from '@mui/material';

import { submitRsvp, AttendeeGroup, Attendee } from '../components/db';

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from '../styles';

function AttendeeForm(props: {updateAttendee: any, removeAttendee: any, attendee: Attendee}) {
    const {updateAttendee, removeAttendee, attendee} = props
    const {first_name, last_name, diet, song, is_attending, is_plus_one} = attendee;

    return <Stack spacing={1}>
        {(is_plus_one)
            ? <p>You have a plus one! Fill this out for them. If you don't need it, just leave this section blank (you can come back and change it).</p>
            : null
        }
        <p>Your name:</p>
        <Stack spacing={1} direction='row'>
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
        </Stack>

        <p>Will you be attending?</p>
        <Stack spacing={1} direction='row'>
            {/* <FormGroup>

                <FormControlLabel required control={
                    <Checkbox checked={is_attending??true} onChange={() => {
                        updateAttendee({...attendee, is_attending: !is_attending});
                    }}/>
                } label="Is Attending" />


            </FormGroup> */}

            <RadioGroup
                row
                aria-label="is_attending"
                name="is_attending"
                value={is_attending ? 'yes' : 'no'}
                onChange={(e) => {
                    updateAttendee({...attendee, is_attending: e.target.value === 'yes'});
                }}
            >
                <FormControlLabel value="yes" control={<Radio />} label="Delightfully Accept" />
                <FormControlLabel value="no" control={<Radio />} label="Regretfully Decline" />
            </RadioGroup>
            {/* {(is_plus_one)
                ? <Button variant='outlined' onClick={e=>{e.preventDefault(); removeAttendee();}}>
                    Remove
                </Button>
                : null
            } */}
        </Stack>
        <p>Any dietary preferences or allergies?</p>
        <TextField
            label="Dietary Preference" value={diet}
            variant="outlined" required={false}
            onChange={(e) => {
                e.preventDefault();
                updateAttendee({...attendee, diet: e.target.value});
            }}
        />
        <p>What song would get you moving and grooving on the dance floor?</p>
        <TextField
            label="Song Recommendation" value={song}
            variant="outlined" required={false}
            onChange={(e) => {
                e.preventDefault();
                updateAttendee({...attendee, song: e.target.value});
            }}
        />
        <Divider flexItem className='py-1'/>
    </Stack>
}

function SubmitButton(props: {form: AttendeeGroup, setResult: any}) {
    let submitAction = submitRsvp.bind(null, props.form);

    return <Button variant='contained'
        onClick={async () => {
            props.setResult('submitting...');
            console.log('submitting', props.form);
            props.setResult(await submitAction());
        }}
    >
        Submit RSVP
    </Button>
}

export default function RsvpForm(props: {attendeeGroup: AttendeeGroup, setAttendeeGroup: any, result: string, setResult: any}) {
    const {attendeeGroup, setAttendeeGroup, result, setResult} = props;
    const {id, email, comment, hotel, shuttle, attendees} = attendeeGroup;


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

    return <div>
    <ThemeProvider theme={ButtonTheme}>
    <div className="flex justify-between items-center py-5">
            <h1 className="text-2xl pt-2 text-[#879b88]">RSVP</h1>
            <Button  variant='outlined' onClick={() => setAttendeeGroup(null)}>Back</Button>
        </div>
    <Stack spacing={1} className='py-5'>
        
        <p>First, what's a good email? This is where we'll send your RSVP info, and any updates as we get closer to the big day.</p>
        <TextField variant="outlined" required={true}
            label="E-mail" value={email} type="email"
            onChange={(e) => setAttendeeGroup({...attendeeGroup, email: e.target.value})}
        />

        <p>Now, for each attendee, please fill out their name and dietary preferrences (or leave blank if you have none), and let us know if they'll be attending:</p>
        <Divider flexItem className='pb-5'/>
        {attendees.map((a) => {
            return <AttendeeForm
                key={a.id} attendee={a}
                updateAttendee={updateAttendee(a.id)}
                removeAttendee={removeAttendee(a.id)}
            />
        })}
        {/* don't let people add attendees--handle plus ones just by comments on the specific plus one tag */}
        {/* <AddAttendeeButton attendees={attendees} setAttendees={(a: Attendee[]) => setAttendeeGroup({...attendeeGroup, attendees:a})}/> */}

        <p>What are your plans for <Link href="/faq#lodging">lodging?</Link></p>
        <RadioGroup 
            aria-label="hotel" name="hotel" value={hotel}
            onChange={(e) => {
                setAttendeeGroup({...attendeeGroup, hotel: e.target.value});
            }}
        >
            <FormControlLabel value="Hilton Downtown" control={<Radio />} label="Hilton Garden Inn Madison Downtown" />
            <FormControlLabel value="East Side" control={<Radio />} label="East side hotel" />
            <FormControlLabel value="Other" control={<Radio />} label="I live in Madison or am getting my own lodging" />
        </RadioGroup>

        <Divider flexItem/>

        <p>What are your plans for <Link href="/faq#shuttle">getting to and from the venue?</Link></p>
        <RadioGroup 
            aria-label="shuttle" name="shuttle" value={shuttle}
            onChange={(e) => {
                setAttendeeGroup({...attendeeGroup, shuttle: e.target.value});
            }}
        >
            <FormControlLabel value="Shuttle" control={<Radio />} label="I'll take the shuttle" />
            <FormControlLabel value="Car" control={<Radio />} label="I'll drive myself or get a ride from someone" />
        </RadioGroup>

        <Divider flexItem/>

        <p>Feel free to leave us a nice comment (or tell us that something isn't working!)</p>
        <TextField variant="outlined" required={false} multiline minRows={2} maxRows={10}
            label="Comment" value={comment}
            onChange={(e) => setAttendeeGroup({...attendeeGroup, comment: e.target.value})}
        />

        <SubmitButton
            form={{
                id: id,
                attendees: attendees,
                email: email,
                comment: comment,
                hotel: hotel,
                shuttle: shuttle,
                num_attendees: attendees.length
            }}
            setResult={setResult}
        />
        <p>{result}</p>
    </Stack>
    </ThemeProvider>
    </div>
}