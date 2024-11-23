'use server'
import { AttendeeGroup } from './db';

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";

import fs from 'node:fs/promises';
import path from 'node:path';

// read the email

// let email_text = null;
// fs.readFile('./email/email.txt', (err,data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     email_text = data as string;
// });

// let email_html = null;
// fs.readFile('./email/email.html', (err,data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     email_html = data;
// });

// Create SES service object.
const sesClient = new SESClient({});

const fromAddress = "noreply@jackwilliams.dev";
const bccAddresses = [
    "jackawilliams13@gmail.com",
    // "hannah.nc.10@gmail.com"
];


export async function sendEmail(attendeeGroup: AttendeeGroup)
{
    // this is run from the __dirname of rsvp, so escape that
    let email_text = await fs.readFile(
        path.resolve(process.cwd(), './public/email/email.txt'),
        { encoding: 'utf8' }
    );
    let email_html = await fs.readFile(
        path.resolve(process.cwd(), './public/email/email.html'), 
        { encoding: 'utf8' }
    );

    email_html = email_html.replace('${rsvp}', '<li>' + attendeeGroup.attendees
        .map((a) => 
            a.first_name + ' ' + a.last_name + '; ' + 
            (a.diet ? 'diet: ' + a.diet + '; ' : '')  + 
            (a.is_attending ? 'attending' : 'not attending')
        )
        .join('</li><li>') + '</li>'
    );
    email_text = email_text.replace('${rsvp}', attendeeGroup.attendees
        .map((a) => '* ' + 
            a.first_name + ' ' + a.last_name + '; ' + 
            (a.diet ? 'diet: ' + a.diet + '; ' : '')  + 
            (a.is_attending ? 'attending' : 'not attending')
        )
        .join('\n')
    );

    function replace(key: string, value: string) {
        email_text = email_text.replace(key, value);
        email_html = email_html.replace(key, value);
        return [email_text, email_html];
    }

    [ email_text, email_html]  = replace("${name}", attendeeGroup.attendees[0].first_name); 
    [ email_text, email_html]  = replace("${hotel}", attendeeGroup.hotel);
    [ email_text, email_html]  = replace("${shuttle}", attendeeGroup.shuttle);
    [ email_text, email_html]  = replace("${email}", attendeeGroup.email);
    [ email_text, email_html]  = replace("${comment}", attendeeGroup.comment);
    [ email_text, email_html]  = replace("${rsvpId}", String(attendeeGroup.id));

    let command = new SendEmailCommand({
        Destination: {
            BccAddresses: bccAddresses,
            CcAddresses: [fromAddress],
            ToAddresses: [attendeeGroup.email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: email_html,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: email_text,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "RSVP for Hannah and Jack's Wedding",
            },
        },
        Source: fromAddress
    });
    // send the email
    try {
        let res = await sesClient.send(command);
        console.log('result', res);
        return true;
    } catch (error) {
        console.log('error', error);
        if (error instanceof Error && error.name === "MessageRejected") {
            /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = error;
            throw messageRejectedError;
        }
        throw error;
    }
    return false;
};


