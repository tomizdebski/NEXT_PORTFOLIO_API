# BARTER_API

This is a server-side application that issues endpoints for the barter-app client application.
Contains:
- user login and registration mechanism,
- crud to Postgres database using prisma library

## Technologies
Project is created with:
* Node
* Express
* Prisma
* Postgres


![](/images/database.png)

## Getting Started

First you need to create an .env file that should contain:

PORT=4000    // port on which the server is to run
CORS_ACCEPTED=http://localhost:3000  // incoming client accepted
DATABASE_URL=postgresql://user:password@127.0.0.1:5432/postgres?schema=public // your database data

//// nodemailer settings

EMAIL_SERVICE=gmail  // name of the mail service
EMAIL_USER=ba---n@gmail.com // your email name
EMAIL_PASS=obmo----wkevidj  // password for your email



Later, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```