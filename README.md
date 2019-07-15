# Borders Workflow Task List

## Set up

Ensure the following:

* Keycloak instance up and running
* Define the tasklist as a client within your realm in Keycloak instance
* Export the environment variables defined in the [sample.env](sample.env) file.
    

## Running

Running locally in dev mode with hot updates:

```
npm run dev
```    

Running in prod mode:

```
npm run build
cd dist/
node server.js
```

URL:

```
http://localhost:8080
```
