'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from '../styles';


export default function Menu() {
  return <Stack>
    <Stack className="justify-center" direction="row" spacing={0}>
      <ThemeProvider theme={ButtonTheme}>
        <Button href="/">Home</Button>
        <Button href="rsvp">RSVP</Button>
        <Button href="story">Story</Button>
        <Button href="faq">FAQ</Button>
        <Button href="registry">Registry</Button>
      </ThemeProvider>
    </Stack>
    <Stack className="justify-center" direction="row" spacing={0}>
      <ThemeProvider theme={ButtonTheme}>
        <Button href="photos">Photos</Button>
        <Button href="travel">Travel</Button>
        <Button href="wedding-party">Wedding Party</Button>
        <Button href="honeymoon">Honeymoon</Button>
      </ThemeProvider>
    </Stack>
  </Stack>
}