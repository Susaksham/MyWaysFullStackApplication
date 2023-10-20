# Project Name

It is a chatting application that contains talking with others.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB installed and running
- Git installed

## Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/Susaksham/MyWaysFullStackApplication.git
cd MyWaysFullStackApplication
```

## Install Frontend Dependencies:

Navigate to the letschat(frontend) directory:

```bash
cd letschat
yarn
```

This will install all frontend packages specified in the package.json file.

## Set Up Environment Variables

Create a .env file in the root of your project and add the following environment variables:

```bash
VITE_API_END_POINT=http://localhost:5001
```

### Start Frontend Development Server:

After installing dependencies, start the frontend development server:

```bash
yarn start
```

The frontend server will be accessible at http://localhost:5173/.

## Install Backend Dependencies:

Navigate to the letschat-backend(backend) directory:

```bash
cd letschat-backend
cd backend
npm i
```

This will install all backend packages specified in the package.json file.

### Start Backend Development Server:

After installing dependencies, start the backend development server:

```bash
npm server.js
```

The frontend server will be accessible at http://localhost:5173/.

## Set Up Environment Variables

Create a .env file in the root of your project and add the following environment variables:

```bash
MONGO_URI=
PORT= 5001
JWT_SECRET = "SUSAKSHAMJAIN"
```

letchat will be running at http://localhost:5173/ by default.
