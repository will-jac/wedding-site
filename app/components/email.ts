'use server'
import { AttendeeGroup } from './db';

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";
// Set the AWS Region.
const REGION = "us-east-1";
// Create SES service object.
const sesClient = new SESClient({ region: REGION });

const fromAddress = "jackawilliams13@gmail.com";
const bccAddresses = [
    "jackawilliams13@gmail.com",
    "hannah.nc.10@gmail.com"
];

export async function sendEmail(toAddress: string, form: AttendeeGroup)
{
    let command = new SendEmailCommand({
        Destination: {
            BccAddresses: bccAddresses,
            CcAddresses: [fromAddress],
            ToAddresses: [toAddress],
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
        return await sesClient.send(command);
    } catch (error) {
        if (error instanceof Error && error.name === "MessageRejected") {
            /** @type { import('@aws-sdk/client-ses').MessageRejected} */
            const messageRejectedError = error;
            return messageRejectedError;
        }
        throw error;
    }
};


