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
  num_attendees: number
}

export async function getAttendees(first_name: string, last_name: string, password: string) {
  if (password !== process.env.PASSWORD) {
    return null;
  }
  
  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();

  let attendeeGroups = [] as AttendeeGroup[];
  // search for the first_name and last_name on the database.
  let key_cursor = "0";
  
  while (true) {
    // technically this could have 
    const resp = await kv.scan(key_cursor, {match: "attendees:*", count: 1000});
    console.log('found:', resp);
    key_cursor = resp[0]; // probably won't need to iterate but you never know
    // technically should stop the search after we find a hit but I'm not optimizing this yet
    attendeeGroups = attendeeGroups.concat(await Promise.all(
      resp[1].map(async (k) => await kv.get(k) as AttendeeGroup)
    ));
    console.log('attendeeGroups:', attendeeGroups.map((ag) => ag.attendees.map((a) => a.first_name + ' ' + a.last_name)));
    // find the matching attendee group, if one exists
    const matching_ags = attendeeGroups.filter((ag) => 
      ag.attendees.some((a) => 
        (a.first_name.toLowerCase() === first_name) && (a.last_name.toLowerCase() === last_name)
      )
    );

    if (matching_ags.length > 0) {
      return matching_ags;
    }
    if (key_cursor === "0") {
      if (first_name === process.env.ADMIN_PASSWORD) {
        console.log(attendeeGroups);
        return attendeeGroups;
      }
      // full loop
      return [];
    }
  }
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
          return {
            id: j,
            first_name: a.first_name ? a.first_name : '',
            last_name: a.last_name ? a.last_name : '',
            is_attending: a.is_plus_one ? false : true,
            diet: '',
            is_plus_one: a.is_plus_one ? a.is_plus_one : false,
          };
        })
      }
    });
    return attendeeGroups;
  });
}

async function uploadAttendee(ag: AttendeeGroup) {  
  return kv.set(`attendees:${ag.id}`, JSON.stringify(ag))
}

async function uploadAttendees(attendeeGroups: AttendeeGroup[]) {  
  console.log('uploading: ', JSON.stringify(attendeeGroups));
  attendeeGroups.map((ag) => uploadAttendee(ag));
  // const res = await kv.set('rsvp:attendees', JSON.stringify(attendeeGroups));
  // console.log('upload status', res);  
}

export async function uploadAttendeesFromFile() {
  uploadAttendees(await readAttendeeGroupsFromFile());
}

export async function submitRsvp(attendeeGroup: AttendeeGroup)
{
  // TODO: validate the user input
  console.log('submitting form...', attendeeGroup);

  await uploadAttendee(attendeeGroup);
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
}