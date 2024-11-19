# personal-finance-management

Personal finance management application, spending record.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) (Package manager)
- A running MongoDB database

## Installation

- Start dev server

```
npm run start:dev
```

## Database

- Initialize Prisma

```
npx prisma init
```

- Prisma Setup

```
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int    @id @default(autoincrement())
  email     String @
}
```

- Generate Prisma Client

```
npx prisma generate
```