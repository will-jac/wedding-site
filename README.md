This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- [x] vercel kv db connection
- [x] email
- [x] fix the css
- [x] proper loading fields and status indicators (mostly done?)
- [x] fix the links in the title/headers and probably make them not sticky to the top
- [x] fix the mailto link in the reservation not found
- [x] make email contain all the necessary information
- [x] be resilient to concurrent edits by changing to hashes by attendee groups and grabbing all of them with a full table scan
- [ ] copy text
- [ ] make email pretty
- [x] make attendee lookup faster by storing a lookup table
- [ ] registry links/integrations and cash contributions
- [x] make attendee forms a subpage that can be directly linked to
- [x] validate user input so that people can't just have infinite attendees
- [ ] actually have proper pages for hotel and things
- [x] probably get people's hotel preference on the attendee form? And song requests
- [ ] make the gallery page possible to load full-size images and download them in bulk
- [ ] change to centralized fonts
- [ ] make it possible to show only some images for a given page using prefixes/metadata/a worker

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
