# API Instruments

## Overview

This project is a full-stack web application that allows users to interact with a database of musical instruments. The application follows the Model-View-Controller (MVC) architectural pattern and is built with Node.js, Express.js, MongoDB, and Mongoose on the back-end, and Vite, React, and Sass on the front-end.

## Features

- User Authentication: Users can register and log in to the application.
- Instrument Database: The application includes a database of musical instruments. Each instrument is associated with a specific family and includes details such as name, description, region of origin, picture and an audio sample.
- Instrument Management: Registered users can add new instruments to the database or edit the instruments they have added.
- Family Filtering: Users can filter instruments by their family.

## Getting Started

1. Clone the repository: Use `git clone` to clone the repository to your local machine.

2. Install dependencies: Navigate to the project directory and run `npm install` to install the necessary dependencies.

3. Start the server: Run `npm start` to start the server or`npm run dev`to start it with nodemon.

4. Start the client: Navigate to the `web` directory and run `npm install` to install the necessary dependencies. Then run `npm run dev` to start the Vite development server.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
