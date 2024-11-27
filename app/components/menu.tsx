'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from '../styles';


export default function Menu() {
  return (
    <Stack className="justify-center" direction="row" spacing={1}>
      <ThemeProvider theme={ButtonTheme}>
        <Button href="rsvp">RSVP</Button>
        <Button href="/#faq">FAQ</Button>
        <Button href="/#story">Story</Button>
        <Button href="photos">Photos</Button>
        {/* <Button href="travel">Travel</Button> */}
      </ThemeProvider>
    </Stack>
  )
}