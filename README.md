# CeluAlquilo

CeluAlquilo is a web platform designed to facilitate users with quick and affordable mobile phone rentals.

---

CeluAlquilo es una plataforma web diseñada para facilitar a los usuarios el alquiler rápido y asequible de teléfonos móviles.

## Backend

This repository contains the backend of the CeluAlquilo platform. It is a RESTful API built with NestJS. The API is designed to be consumed by the [frontend](https://github.com/fedemelo/celualquilo-front) of the platform.

## Running the Backend locally

To run the backend locally, you need to have Node.js installed. Then, you can run the following commands:
```bash
npm install
```
And then:
```bash
npm start
```

The application connects to a PostgreSQL database, so you need to have it installed and running. You can configure the database connection in the `app.module.ts` file. It is recommended to use the `pgAdmin4` tool to manage the database.

When creating the database, the SQL script in the `insertionsCelualquilo.sql` file can be used to create the tables and populate them with some initial data. This is crucial for the [frontend](https://github.com/fedemelo/celualquilo-front) to work properly.