<h1 align="center"> Express Server Starter Code </h1>

## Features:

-  TypeScript
-  MongoDB setup
-  Error Handler
-  Logger
-  .env setup
-  Mongoose model example
-  JOI validation schema example
-  CRUD operations example

#

## Setup :

### Step 1: Clone the repository

Clone the repo locally using:

```sh
git clone git@github.com:ankushknr19/express-server-starter-code.git
```

### Step 2: Install Dependencies

Install dependencies in the backend folder

```sh
cd express-server-starter-code
cd backend
pnpm install
```

### Step 2: Build dist folder

```sh
tsc --build
```

### Step 3: Setup Environment Variables

-  rename [.env.example](./backend/.env.example) file to [.env](/)
-  replace the values with your own valid values

### Step 4: Run the server

```sh
pnpm run dev
```

### Step 5: Perform CRUD operations from [rest.http](./backend/rest.example.http.http) file

#

## How to use :

### 1. http-errors module :

-  it is used to create errors with proper http status code
-  throwing error in try block:

   ```sh
   try {
       throw new createHttpError.BadRequest()
   }

   ```

### 2. Error Handler Middleware :

-  accepts error object as first parameter
-  executed whenever a middleware calls next(error)
-  in any middleware, in catch block:
   ```sh
   catch{
       next(error)
   }
   ```

### 3. Morgan and Winston logger :

-  saves all logs
-  5 levels: error, warn, info, http & debug
-  morgan creates http logs
-  instead of doing console.log(), do:

   ```sh
   import logger from './middlewares/winstonLogger'

   logger.error('error message')
   logger.warn('warning message')
   ```

### 4. env variables :

-  first create a variable in .env file
-  then import and declare it in [config/env.ts](./backend/src/config/env.ts) file

#
