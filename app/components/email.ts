'use server'
import { AttendeeGroup } from './db';

import { SendEmailCommand } from "@aws-sdk/client-ses";
import { SESClient } from "@aws-sdk/client-ses";

const email_html = `<div dir="ltr">Congratulations __name__, you've successfully RSVP'd!!
<br><br>We can't wait to see you at our wedding. In the meantime:<br>
<ul>
<li><a href="http://hannahjackwedding.com/travel" target="_blank">
    Book your hotel</a></li>
<li><a href="http://hannahjackwedding.com/travel#madison" target="_blank">
    Check out things to do in Madison</a></li>
<li><a href="http://hannahjackwedding.com/registry" target="_blank">
    Browse our registry</a></li>
</ul>
<br><br>Here's a copy of your RSVP for your reference:<br>
<ul>__rsvp__</ul>
<br>
<br>Lodging: __hotel__<br>
<br>Shuttle: __shuttle__<br>
<br>Comment: __comment__<br>
<br><br>Need to make a change? Just <a href="http://hannahjackwedding.com/rsvp/__rsvpId__" target="_blank">RSVP again</a>.
<br>See you soon!<br>
<div>- Hannah and Jack</div>
<div><br></div>
<div><br></div><i>Issues? Let me know! I don't monitor this email address, so please <a
        href="mailto:jackawilliams13@gmail.com" target="_blank">email me directly</a> or reply all to this email.</i>
</div>
`
const email_text = `Congratulations __name__, you've successfully RSVP'd!!

We can't wait to see you at our wedding. In the meantime:
* Book your hotel
* Check out things to do in Madison
* Browse our registry

Here's a copy of your RSVP for your reference:
__rsvp__

Lodging: __hotel__
Shuttle: __shuttle__
Comment: __comment__

Need to make a change? Just RSVP again at http://hannahjackwedding.com/rsvp/__rsvpId__

See you soon!
-Hannah and Jack

Issues? Let me know! I don't monitor this email address, so please email me directly or reply-all (I'm CC'd)
Unsubscribe`;

// read the email

// Create SES service object.
const sesClient = new SESClient({});

// const fromAddress = "noreply@hannahjackwedding.com";
const fromAddress = "noreply@jackwilliams.dev";
const ccAddresses = [
    "jackawilliams13@gmail.com",
    "hannah.nc.10@gmail.com"
];


export async function sendEmail(attendeeGroup: AttendeeGroup)
{
    
    let local_email_html = email_html.replace('__rsvp__', '<li>' + attendeeGroup.attendees
        .map((a) => 
            a.first_name + ' ' + a.last_name + '; ' + 
            (a.diet ? 'diet: ' + a.diet + '; ' : '')  + 
            (a.song ? 'song: ' + a.song + '; ' : '')  + 
            (a.is_attending ? 'attending' : 'not attending')
        )
        .join('</li><li>') + '</li>'
    );
    let local_email_text = email_text.replace('__rsvp__', attendeeGroup.attendees
        .map((a) => '* ' + 
            a.first_name + ' ' + a.last_name + '; ' + 
            (a.diet ? 'diet: ' + a.diet + '; ' : '')  + 
            (a.song ? 'song: ' + a.song + '; ' : '')  + 
            (a.is_attending ? 'attending' : 'not attending')
        )
        .join('\n')
    );

    function replace(key: string, value: string) {
        local_email_text = local_email_text.replace(key, value);
        local_email_html = local_email_html.replace(key, value);
        return [local_email_text, local_email_html];
    }

    [ local_email_text, local_email_html]  = replace("__name__", attendeeGroup.attendees[0].first_name); 
    [ local_email_text, local_email_html]  = replace("__hotel__", attendeeGroup.hotel);
    [ local_email_text, local_email_html]  = replace("__shuttle__", attendeeGroup.shuttle);
    [ local_email_text, local_email_html]  = replace("__email__", attendeeGroup.email);
    [ local_email_text, local_email_html]  = replace("__comment__", attendeeGroup.comment);
    [ local_email_text, local_email_html]  = replace("__rsvpId__", String(attendeeGroup.id));

    let command = new SendEmailCommand({
        Destination: {
            CcAddresses: ccAddresses,
            ToAddresses: [attendeeGroup.email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: local_email_html,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: local_email_text,
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


