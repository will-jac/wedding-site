'use server'
import { AttendeeGroup } from './db';

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";

// Set the AWS Region.
const REGION = "us-east-2";
// Create SES service object.
const sesClient = new SESClient({ region: REGION });

const fromAddress = "noreply@jackwilliams.dev";
const bccAddresses = [
    "jackawilliams13@gmail.com",
    // "hannah.nc.10@gmail.com"
];



export async function sendEmail(attendeeGroup: AttendeeGroup)
{
    const email_text = `Congratulations, you've successfully RSVP'd!!

We can't wait to see you at our wedding. In the meantime:
* Book your hotel
* Check out things to do in Madison
* Browse our registry

-Hannah and Jack

Issues? Let me know! I don't monitor this email address, so please email me directly or reply-all (I'm CC'd)
Unsubscribe
`
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
                    Data: email_text,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: email_text,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "RSVP for Hannah and Jack Williams Wedding (June 1, 2025)",
            },
        },
        Source: fromAddress
    });

    // send the email
    try {
        let res = await sesClient.send(command);
        console.log('result', res);
        return;
    } catch (error) {
        console.log('error', error);
        if (error instanceof Error && error.name === "MessageRejected") {
            /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = error;
            return messageRejectedError;
        }
        throw error;
    }
};


