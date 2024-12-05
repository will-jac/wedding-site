'use server'
import { kv } from "@vercel/kv";
import { writeFileSync } from "fs";
import { sendEmail } from './email';
import { hash } from "crypto";


export interface Attendee {
  id: number,
  first_name: string,
  last_name: string,
  is_attending: boolean | null,
  diet: string | null,
  song: string | null,
  is_plus_one: boolean | null
}
export interface AttendeeGroup {
  id: string,
  attendees: Attendee[],
  email: string,
  comment: string,
  hotel: string,
  shuttle: string,
  party: string,
  num_attendees: number
}

interface AttendeeMapEntry {
  first_name: string,
  last_name: string,
  groupId: string
}

async function getAttendeeMap() {
  return await kv.get('attendeeMap') as AttendeeMapEntry[];
}

async function buildAttendeeMap() {
  console.log('building attendee map')
  let key_cursor = "0";
  let attendeeGroups = [] as AttendeeGroup[];
  
  while (true) {
    const resp = await kv.scan(key_cursor, {match: "attendees:*", count: 1000});
    // console.log('found:', resp);
    key_cursor = resp[0]; // probably won't need to iterate but you never know
    // technically should stop the search after we find a hit but I'm not optimizing this yet
    attendeeGroups = attendeeGroups.concat(await Promise.all(
      resp[1].map(async (k) => await kv.get(k) as AttendeeGroup)
    ));
    if (key_cursor === "0") {
      break;
    }
  }

  return attendeeGroups.map(ag => 
    ag.attendees.map(a => {
      return {
        groupId: ag.id,
        first_name: a.first_name.toLowerCase(),
        last_name: a.last_name.toLowerCase()
      } as AttendeeMapEntry;
    }
  )).flat();
}

async function updateAttendeeMap(attendeeGroup: AttendeeGroup) {
  // try to grab the lock
  let lock: number = await kv.get('attendeeMap:lock') ?? 0;
  if (lock != 0) {
    // failure to grab the lock. Mark it as dirty for the next group to update?
    console.log('failed to get the lock')
    await kv.set("attendeeMap:dirty", 1);
    return;
  }
  // set the lock
  let uuid = 1234;
  await kv.set('attendeeMap:lock', uuid);
  // check that we actually have it
  lock = await kv.get('attendeeMap:lock') as number;
  if (lock !== uuid) {
    // race condition
    console.log('uh oh, race condition')
    await kv.set("attendeeMap:dirty", 1);
    return;
  }

  // okay, we have the lock. Check if it's dirty and we need to rebuild
  let dirty: number = await kv.get('sttendeeMap:dirty') ?? 0;
  let attendeeMap: AttendeeMapEntry[];
  if (dirty === 1) {
    attendeeMap = await buildAttendeeMap();
    kv.set('attendeeMap:dirty', 0);
  }
  else {
    attendeeMap = await getAttendeeMap();
  }
  

  // now that we have the attendeeMap, update this entry
  attendeeMap = attendeeMap.filter(a => a.groupId != attendeeGroup.id);
  attendeeMap = attendeeMap.concat(attendeeGroup.attendees.map(a => {
    return {
      groupId: attendeeGroup.id,
      first_name: a.first_name.toLowerCase(),
      last_name: a.last_name.toLowerCase()
    };
  }));

  kv.set('attendeeMap', attendeeMap);
  kv.set('attendeeMap:lock', 0);
}

export async function getAttendees(first_name: string, last_name: string, password: string) {
  console.log('searching for:', first_name, last_name, password);

  if (password !== process.env.PASSWORD) {
    return null;
  }
  
  first_name = first_name.toLowerCase();
  last_name = last_name.toLowerCase();

  let attendeeGroups = [] as AttendeeGroup[];

  const am = await getAttendeeMap();
  console.log('fetched attendee map');
  const matches = am.filter(a => 
    a.first_name.startsWith(first_name) && a.last_name.startsWith(last_name)
  );

  if (matches.length > 0) {
    console.log('found match in AttendeeMap');
    // found match in AttendeeMap
    return Promise.all(matches.map(
      async (a) => await kv.get("attendees:" + String(a.groupId)) as AttendeeGroup
    ));
  }

  // Failure to find it in the map: do a full table scan as the fallback
  // search for the first_name and last_name on the database.
  let key_cursor = "0";
  
  while (true) {
    console.log('really searching')
    // technically this could have 
    const resp = await kv.scan(key_cursor, {match: "attendees:*", count: 1000});
    // console.log('found:', resp);
    key_cursor = resp[0]; // probably won't need to iterate but you never know
    // technically should stop the search after we find a hit but I'm not optimizing this yet
    attendeeGroups = attendeeGroups.concat(await Promise.all(
      resp[1].map(async (k) => await kv.get(k) as AttendeeGroup)
    ));
    // console.log('attendeeGroups:', attendeeGroups.map((ag) => ag.attendees.map((a) => a.first_name + ' ' + a.last_name)));
    // find the matching attendee group, if one exists
    const matching_ags = attendeeGroups.filter((ag) => 
      ag.attendees.some((a) => 
        a.first_name.toLowerCase().startsWith(first_name) && a.last_name.toLowerCase().startsWith(last_name)
      )
    );

    if (matching_ags.length > 0) {
      console.log('returning found search match')
      return matching_ags;
    }
    if (key_cursor === "0") {
      if (first_name === process.env.ADMIN_PASSWORD) {
        console.log('admin!')
        return attendeeGroups;
      }
      // full loop
      return [];
    }
  }
}

export async function getAttendeeGroup(key: string) {
  return await kv.get(`attendees:${key}`) as AttendeeGroup;
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
        id: ag.id ?? hash("sha1", String(j)),
        attendees: ag.attendees.map((a) => {
          j += 1;
          return {
            id: j,
            first_name: a.first_name ? a.first_name : '',
            last_name: a.last_name ? a.last_name : '',
            is_attending: a.is_plus_one ? false : true,
            diet: '',
            song: '',
            is_plus_one: a.is_plus_one ? a.is_plus_one : false,
          };
        })
      }
    });
    return attendeeGroups;
  });
}

async function uploadAttendee(ag: AttendeeGroup) {  
  kv.set(`attendees:${ag.id}`, JSON.stringify(ag));
  updateAttendeeMap(ag);
}

async function clearAttendees() {  
  console.log('clearing...');
  await kv.del('attendeeMap');
  await kv.del('attendeeMap:lock');
  await kv.del('attendeeMap:dirty');
  let key_cursor = "0";
    
  const resp = await kv.scan(key_cursor, {match: "attendees:*", count: 1000});
  console.log('found:', resp);
  key_cursor = resp[0]; // probably won't need to iterate but you never know
  if (key_cursor !== "0") {
    throw Error('uh oh, did not fully delete everything');
  }
  // technically should stop the search after we find a hit but I'm not optimizing this yet
  return Promise.all(
    resp[1].map(async (k) => {
      console.log('del', k)
      let res = await kv.del(k);
      if (res != 1) {
        console.log(res, k);
      }
    })
  );
}

async function uploadAttendees(attendeeGroups: AttendeeGroup[]) {  
  console.log('uploading: ', JSON.stringify(attendeeGroups));
  attendeeGroups.map((ag) => kv.set(`attendees:${ag.id}`, JSON.stringify(ag)));
  const am = await buildAttendeeMap();
  console.log('build attendeemap:');
  // console.log('am:', am);
  kv.set('attendeeMap', am);
  kv.set('attendeeMap:lock', 0);
  kv.set('attendeeMap:dirty', 0);
}

export async function uploadAttendeesFromFile() {
  await clearAttendees();
  console.log('uploading...')
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