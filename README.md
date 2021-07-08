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

Then, you can query the api by typing of localhost:3000

## Run tests

```shell
npm run test
```

## Project architecture

```
.
|- .circleci    # Circle CI config
|- api          # Api routes/endpoints
|- const        # Constants
|- models       # Mongoose models
|- script       # initialization scripts
|- services     # Services layer
|- controllers  # Controllers layer
|- utils        # utilities
+- test         # tests
```
