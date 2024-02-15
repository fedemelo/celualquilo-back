# CeluAlquilo

CeluAlquilo is a web platform designed to facilitate users with quick and affordable mobile phone rentals.

---

CeluAlquilo es una plataforma web diseñada para facilitar a los usuarios el alquiler rápido y asequible de teléfonos móviles.

## Backend

This repository contains the backend of the CeluAlquilo platform. It is a RESTful API built with NestJS. The API is designed to be consumed by the [frontend](https://github.com/fedemelo/celualquilo-front) of the platform.

The backend connects to a PostgreSQL database. It is dockerized, so you can use Docker to run the backend, the database and the `pgAdmin4` tool to manage the database in separate containers.

## Running the Backend

1. **Ensure Docker and Docker Compose are installed in your system.** An easy way is to [install Docker Desktop](https://www.docker.com/products/docker-desktop/), which includes both.

2. **To build and run the backend, the database, and the `pgAdmin4` tool**, execute the following command from the root folder of the repository in the terminal:
   ```bash
    docker-compose up
    ```
    - If changes are made to the code and the backend needs to be rebuilt, the `--build` flag can be used.
    - The containers can be run in the background using the `-d` flag.

    The `pgAdmin4` tool will be running on `http://localhost:5050`. The backend will be running on `http://localhost:3000`. The database will be running on `localhost:5432`.

3. **Access the `pgAdmin4` tool** on http://localhost:5050 with the credentials found in the docker-compose.yml file. Create a new server with the following credentials:
   - Name: `celualquilo`
   - Host: `postgres`
   - Port: `5432`
   - Username: `user`
   - Password: `password`

4. On the server, access the `celualquilo` database and create the tables running the SQL script in the `insertionsCelualquilo.sql` file with the `Query Tool` of `pgAdmin4`. This will populate the database with some initial data, which is crucial for the [frontend](https://github.com/fedemelo/celualquilo-front) to look and work properly.

To stop the containers, run `docker-compose down` in the terminal.
