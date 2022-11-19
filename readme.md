<h1 align="center"> TS-Express-Mongo Starter Code </h1>

## Features:

-  TypeScript
-  MongoDB setup
-  Exception Handler
-  Logger
-  HTTP testing example
-  Swagger Docs example
-  Mongoose model example
-  JOI validation example
-  CRUD operations example

#

## Setup :

### Step 1: Clone the repository

Clone the repo locally using:

```sh
git clone git@github.com:ankushknr19/express-server-starter-code.git your-app-name
```

### Step 2: Install Dependencies

Install dependencies in the backend folder

```sh
cd your-app-name
cd backend
npm install
```

### Step 2: Build dist folder

```sh
npm run build
```

### Step 3: Setup Environment Variables

-  rename [.env.example](./backend/.env.example) file to [.env](/)
-  replace the values with your own valid values

### Step 4: Test the server

```sh
npm run test
```

### Step 5: Run the server

```sh
npm run dev
```

### Step 6:

### See API Docs at <a> http://localhost:5800/api-docs </a> ( use your port )

### (or) Perform CRUD operations from [rest.example.http](./backend/rest.example.http.http) file

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
