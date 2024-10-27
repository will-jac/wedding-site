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
    const email_text = await fs.readFile(
        path.resolve(process.cwd(), './app/components/email/email.txt'),
        { encoding: 'utf8' }
    );
    const email_html = await fs.readFile(
        path.resolve(process.cwd(), './app/components/email/email.html'), 
        { encoding: 'utf8' }
    );
    console.log('loaded email text');

    email_text.replace('${name}', attendeeGroup.attendees[0].first_name)
    email_html.replace('${name}', attendeeGroup.attendees[0].first_name)

    console.log('test sending email!!')
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
                Data: "RSVP for Hannah and Jack Williams Wedding",
            },
        },
        Source: fromAddress
    });
    console.log('email command created...')
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


