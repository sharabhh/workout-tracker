# FitLogger
## _The Best workout logger

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

Fitlogger is a cross platform workout logger, mobile-ready,
powered by React Native.

## Local Setup instructions (with Docker)
- open the folder you want to setup the project in
`git clone https://github.com/sharabhh/workout-tracker.git`
`cd workout-tracker`
- rename the '.env.example' files in both client and server to '.env'
- run `docker-compose --build` from the root of the workout-tracker directory
- after everything is completed, either access the application on ExpoGo client on your mobile (recommended) or open [http://localhost:8081] on your machine

## Local Setup instructions (without Docker)
- open the folder you want to setup the project in
`git clone https://github.com/sharabhh/workout-tracker.git`
`cd workout-tracker`
- rename the '.env.example' files in both client and server to '.env'
- `cd server`
- `npm install`
- `npm run dev` then => terminal should show that "db is connected"
- Now we will setup frontend, open a seperate terminal window
- from the root workout-tracker directory
- `cd client`
- `npm install`
- `npm start`
- after everything is completed, either access the application on ExpoGo client on your Expo Go client mobile url: [ exp://<your-ipv4-address>:8081](exp://<your-ipv4-address>:8081) (recommended) or open [http://localhost:8081] on your machine
> find you ipv4 address by running ipconfig in the terminal
## Features

- Login and signup functionality to keep your data safe.
- View and filter your past workouts.
- Delete your past workouts.
- check the total number of workouts.
- sort the workouts from the latest or earliest.

## Tech

Fitlogger uses a number of technologies to work properly:

- [TailwindCss](https://tailwindcss.com/) via [Nativewind](https://www.nativewind.dev/) - For styling 
- [JWT tokens](https://jwt.io/) - for authentication
- [Nodejs](https://nodejs.org/en) along with [npm](https://docs.npmjs.com/cli/v10) - For Javascript runtime environment.
- [Typescript](https://www.typescriptlang.org/) - for typesafety
- [Express](https://expressjs.com/) - to build all of the routes and middlewares
- [Docker](https://www.docker.com/) - for containerization
- [React Native](https://reactnative.dev/) - and finally react native for building the entire frontend

> "Feel free to use the source code or suggest improvements."