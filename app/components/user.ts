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
    "jackawilliams13@gmail.com"
];

const url = "https://r2-worker.hannahjackwedding.com/adminFetchAccount";

export async function sendLoginEmail(user: User) {
    const userToSendTo = await (await fetch(`https://r2-worker.hannahjackwedding.com/adminFetchAccount?email=${user.email}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-hjwedding-admin': process.env.ADMIN_API_KEY ?? ""
            }
        }
    )).json();

    const loginUrl = `https://hannahjackwedding.com/login?userId=${encodeURIComponent(userToSendTo.userId ?? "")}&userKey=${encodeURIComponent(userToSendTo.userKey ?? "")}`;
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

export async function getUser(userId: string, userKey: string) {
  const url = "https://r2-worker.hannahjackwedding.com/account";
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'x-hjwedding-userKey': userKey,
          'x-hjwedding-userId': userId ?? ""
      }
  });
  if (!response.ok) {
    //   console.log(response);
      const body = await response.text()
    //   console.log(body);
      throw new Error(`Failed to get account: ${response.statusText}`);
  }
  return await response.json() as User;
}