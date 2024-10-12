'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function LinkButton(props: any) {
  const { link, text } = props;
  return (
    <a href={link}>
      <Button 
        // onClick={(e) => {
        //   e.preventDefault();
        //   window.location.href = link;
        // }}
      >
        {text}
      </Button>
    </a>
  )
}

export default function Menu() {
  return (
    <Stack className="justify-center" direction="row" spacing={2}>
      <LinkButton text="Story" link="#story"/>
      <LinkButton text="Location" link="#location"/>
      <LinkButton text="Attire" link="#attire"/>
      <LinkButton text="RSVP" link="rsvp"/>
    </Stack>
  )
}