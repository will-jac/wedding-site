'use client';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';
import { ButtonTheme } from '../styles';


export default function Menu() {
  return (
    <Stack className="justify-center" direction="row" spacing={1}>
      <ThemeProvider theme={ButtonTheme}>
        <Button href="/#story">Our Story</Button>
        <Button href="/#faq">FAQ</Button>
        <Button href="rsvp">RSVP</Button>
      </ThemeProvider>
    </Stack>
  )
}