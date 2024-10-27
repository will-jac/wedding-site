'use server'
import { kv } from "@vercel/kv";
import { writeFileSync } from "fs";
import { sendEmail } from './email';

export interface Attendee {
  id: number,
  first_name: string,
  last_name: string,
  is_attending: boolean | null,
  diet: string | null,
  is_plus_one: boolean | null
}
export interface AttendeeGroup {
  id: number,
  attendees: Attendee[],
  email: string,
  comment: string | null,
  hotel: string | null,
}

export async function getAttendees() {
  const attendees = await kv.get('rsvp:attendees');
  writeFileSync("attendees.json", JSON.stringify({"attendeeGroups": attendees}), {
    flag: "w"
   });
  console.log(attendees);
}

async function readAttendeeGroupsFromFile() {
  let i = 0;
  let j = 0;
  return await import('../../attendees.json').then(async (data) => {
    let attendeeGroups: AttendeeGroup[] = JSON.parse(JSON.stringify(data.attendeeGroups));
    attendeeGroups = attendeeGroups.map((ag) => {
      i += 1;
      return {
        ...ag,
        id: i,
        attendees: ag.attendees.map((a) => {
          j += 1;
          return {...a, id: j};
        })
      }
    });
    return attendeeGroups;
  });
}

export async function uploadAttendees(attendeeGroups: AttendeeGroup[]) {  
  console.log('uploading: ', JSON.stringify(attendeeGroups));
  const res = await kv.set('rsvp:attendees', JSON.stringify(attendeeGroups));
  console.log('upload status', res);  
}

export async function uploadAttendeesFromFile() {
  uploadAttendees(await readAttendeeGroupsFromFile());
}

async function getAttendeeGroups() {
  const attendeeString = await kv.get('rsvp:attendees') as AttendeeGroup[];
  console.log('downloaded:', attendeeString);
  return attendeeString
}

export async function lookupRsvpByName(first_name: string, last_name: string) {
  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();

  const attendeeGroups = await getAttendeeGroups();

  return attendeeGroups.filter((ag) => {
    return ag.attendees.some((a) => {
      // TODO: predicate / fuzzy match
      return (a.first_name.toLowerCase() === first_name) && (a.last_name.toLowerCase() == last_name);
    })
  })
}


// TODO: not resilient to concurrent edits. I suggest not doing those.
export async function submitRsvp(attendeeGroup: AttendeeGroup)
{
  // TODO: validate the user input
  console.log('submitting form...')
  let attendeeGroups = await getAttendeeGroups();
  attendeeGroups = attendeeGroups.map((ag) => {
    if (ag.id === attendeeGroup.id) return attendeeGroup;
    return ag;
  });
  uploadAttendees(attendeeGroups);
  console.log('form submitted');

  let email_result = '';
  try {
    if (await sendEmail(attendeeGroup)) {
      email_result = 'success';
    }
    else {
      email_result = 'failed to send email';
    }
  } catch (err) {
    email_result = 'error message: ' + (err as Error).message;
  }

  return email_result;

  // // first, submit the session and get an id back from the server
  // // then use that as a FK for the attendees
  // let formResp: string;
  // try {
  //   formResp = await kv.xadd('rsvp:submit', "*", {
  //     email: form.email,
  //     comment: form.comment
  //   });
  //   console.log('form', formResp);
  // } catch (error) {
  //   // Handle errors
  //   console.log(error);
  //   return;
  // }
  // console.log('submitting attendees')
  // // stream users
  // form.attendees.map(async (a) => {
  //   try {
  //     //TODO: format string with the session id
  //     let resp = await kv.xadd(`attendees:${formResp}`, "*", {
  //       firstName: a.first_name,
  //       lastName: a.last_name,
  //       diet: a.diet,
  //       attending: a.is_attending,
  //       plusOne: a.is_plus_one,
  //     });
  //     console.log('attendee:', resp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // TODO: send an email telling them that they successfully submitted it

}