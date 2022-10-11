This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes

This was a fun challenge, and I enjoyed building it. There are a few things I'd like to mention about what I'd do if I had more time.

- I'd be more thoughtful about components and where/when to break out something into a component. I think some of the existing pages could be broken down a bit more.
- The tests are there, but mainly for components. I tried to cover the obvious stuff, and didn't write enough tests for bad data, failures, etc. I'd also write some kind of E2E tests with Cypress, and tests for pages.
- I didn't spend a lot of time on the design of the site (clearly), but I did try to have some fun with it.
- The API is just a mimic of the API you supplied. It is in no way a secure or well-built API. It does just enough. It behaves like the original except the Order_IDs are strings so that I can use UUIDs.
- I didn't work on Friday or Saturday because it was my birthday, and my wife and I were out of town.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/orders](http://localhost:3000/api/orders). This endpoint can be edited in `pages/api/orders.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Docker 

Make sure [Docker](https://docs.docker.com/get-docker/) is installed on your machine.

Then run:

`docker build -t pizzatime .`
`docker run -p 3000:3000 pizzatime`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
