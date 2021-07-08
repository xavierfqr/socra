# socra

## Install the project

```shell
git clone https://github.com/remydao/socra
cd socra
npm install
```

## Run the project

First of all, launch the server:

```shell
npm run dbinit # to populate database
npm start
```

Then, you can query the api on localhost:3000

## Swagger documentation

Once the database is initialized and the server launched, you can check the api documentation on :
localhost:3000/api-docs

## Run tests

```shell
npm run test
```

## Project architecture

```
.
|- api          # Api endpoints
|- config       # Confiuration data
|- const        # Constants
|- models       # Mongoose models
|- node_modules # npm modules
|- script       # init scripts
|- services     # Services layer
|- controllers  # Controllers layer
+- test         # test
```
