'use server';
import { ImageProps } from './gallery/utils/types';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export interface User {
    email: string;
    userName: string;
    userId?: string;
    userKey?: string;
    profilePicture?: string;
}

const sesClient = new SESClient({});
const fromAddress = "noreply@jackwilliams.dev";
const bccAddresses = [
    "jackawilliams13@gmail.com",
    "hannah.nc.10@gmail.com"
];

export async function sendLoginEmail(user: User) {
    const loginUrl = `https://hannahjackwedding.com/login?userId=${encodeURIComponent(user.userId ?? "")}&userKey=${encodeURIComponent(user.userKey ?? "")}`;
    const subject = "Hannah & Jack Wedding Login Link";
    const html = `<div>Hi ${user.userName},<br/><br/>Thank you for creating an account!<br/><br/>You can upload your photos at any time using this link:<br/><a href='${loginUrl}'>Login Link</a><br/><br/>If you did not request this, you can ignore this email.<br/><br/>- Hannah & Jack</div>`;
    const text = `Hi ${user.userName},\n\nThank you for creating an account!\n\nYou can upload your photos at any time using this link:\n${loginUrl}\n\nIf you did not request this, you can ignore this email.\n\n- Hannah & Jack`;

    const command = new SendEmailCommand({
        Destination: {
            ToAddresses: [user.email],
            BccAddresses: bccAddresses,
        },
        Message: {
            Body: {
                Html: { Charset: "UTF-8", Data: html },
                Text: { Charset: "UTF-8", Data: text },
            },
            Subject: { Charset: "UTF-8", Data: subject },
        },
        Source: fromAddress,
    });
    await sesClient.send(command);
}

export async function getUser(userKey: string) {
  const url = "https://r2-worker.jackawilliams13.workers.dev/account";
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-hjwedding-userKey': userKey
      }
  });
  if (!response.ok) {
      console.log(response);
      const body = await response.text()
      console.log(body);
      throw new Error(`Failed to get account: ${response.statusText}`);
  }
  return await response.json() as User;
}