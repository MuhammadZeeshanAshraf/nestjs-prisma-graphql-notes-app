## Getting Started 🚀

Follow the instructions below to get started with the Note App.

### Prerequisites 📋

Make sure you have the following prerequisites installed on your machine:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Nest CLI (version 7 or higher)
- PostgreSQL (version 10 or higher)
- Docker (v20 or higher)

### Installation ⚙️

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammadZeeshanAshraf/nestjs-prisma-graphql-notes-app.git
   ```

2. Install the dependencies:

   ```bash
   cd nestjs-prisma-graphql-notes-app
   npm install
   ```

### Environment Variables 🌍

The Dastgyr Growth backend code requires certain environment variables to be set in order to run correctly. These variables are defined in a `.env` file, which should be located in the root of the project directory. 

You can create a `.env` file by copying the `.env.example` file and updating the values as necessary:

```bash
cp .env.example .env
```

environment variables file should contain the following 
```
💻 #Environment
NODE_ENV=
PORT=

💾 #Database
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_SCHEMA=
DB_CONNECTION_NAME=
```

Update the values in the `.env` file as needed for your environment.

### Running the Server ▶️

Run the application in development mode by running the following command in the project directory:

```bash
npm run start:dev
```

This will start the server in development mode, with hot reloading enabled for any changes you make to the code. Once the server is running, you can access it by navigating to `http://localhost:<port>` in your web browser.

Alternatively, you can start the server in production mode using the following command:

```bash
npm run start:prod
```

This will start the server in production mode, which is optimized for performance.

To add new environment variables, you can simply add them to the `.env` file in the project directory. You can then access these variables in your code using the `process.env` object.

For example, if you add a new variable `MY_VARIABLE` to your `.env` file like so:

```
MY_VARIABLE=my_value
```

Note that you will need to restart the application for the changes to take effect.

### Swagger UI 📚

With the project set up, you can check if the server is running properly by visiting the Swagger UI at the specified URL and port in your environment file.

```
http://localhost:<port>/api#/
```

That's it! You should now be able to run the Trade Assurance backend project locally on your machine.
