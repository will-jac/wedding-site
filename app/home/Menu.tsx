'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function RelLinkButton(props: any) {
  const { link, text } = props;
  return (
    <Button onClick={(e) => {
      e.preventDefault();
      window.location.href = link;
    }}>
      {text}
    </Button>
  )
}

export default function TitleRow() {
  return (
    <Stack className="justify-center" direction="row" spacing={2}>
      <RelLinkButton text="Story" link="#story"/>
      <RelLinkButton text="Location" link="#location"/>
      <RelLinkButton text="Attire" link="#attire"/>
      <RelLinkButton text="RSVP" link="#rsvp"/>
    </Stack>
  )
}