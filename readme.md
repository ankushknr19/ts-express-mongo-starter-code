<h1 align="center"> TS-Express-Mongo Starter Code </h1>

## Features:

-  Production Ready
-  TypeScript
-  MongoDB setup
-  Error & Exception Handler
-  Morgan & Winston Logger
-  Jest, Supertest Api Testing
-  Automatic Swagger Docs Generation
-  ZOD Validation
-  Api Versioning
-  Scalable for large projects

#

## Setup :

### Step 1: Clone the repository

Clone the repo to backend directory:

```sh
git clone https://github.com/ankushknr19/ts-express-mongo-starter-code.git backend
```

### Step 2: Install Dependencies

Install dependencies

```sh
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

### Step 4: Perform api testing

```sh
npm run test
```

### Step 5: Run the server

```sh
npm run dev
```

### Step 6:

### See API Docs at <a> /api-docs </a>

### (or) Perform CRUD operations from [rest.example.http](./rest.example.http) file

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

-  5 levels: error, warn, info, http & debug
-  morgan creates http logs
-  instead of doing console.log(), do:

   ```sh
   import logger from './utils/winstonLogger'

   logger.error('error message')
   logger.warn('warning message')
   ```

### 4. env variables :

-  first create a variable in .env file
-  then import and declare it in [config/env.ts](./src/config/env.ts) file

#
