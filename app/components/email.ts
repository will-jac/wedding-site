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
                    Data: "HTML_FORMAT_BODY",
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "EMAIL_SUBJECT",
            },
        },
        Source: fromAddress
    });

    // send the email
    try {
        let res = await sesClient.send(command);
        console.log(res);
    } catch (error) {
        if (error instanceof Error && error.name === "MessageRejected") {
            /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = error;
            console.log(error);
            return messageRejectedError;
        }
        throw error;
    }
};


