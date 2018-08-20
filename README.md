# BigchainDB + React boilerplate

This is simple react boilerplate with basic create transaction included. To replicate client code check REPLICATE.md

## Clone
Clone or fork this repo

```bash
git clone git@github.com:bigchaindb/bigchaindb-react-boilerplate.git my-bigchaindb-project
```

and

```bash
cd my-bigchaindb-project
```

## Server-side setup

First things first. You'll need a (local) BigchainDB server to get going with the API.

If you want run the server locally follow these steps:

### Quickstart with Docker (Windows, OSX, lazy Linux)

#### Prequisites

You must have `docker`, `docker-compose` (and `make`) installed.
These versions or higher should work:

- `docker`: `v18.06.0`
- `docker-compose`: `v1.22.0`

#### Locally launch BigchainDB server

To spin up the services, simple run the make command, which will orchestrate `docker-compose`

```bash
docker-compose up bigchaindb -d
```

This might take a few minutes, perfect moment for a :coffee:!

Once docker-compose has built and launched all services, have a look:

```bash
docker ps
```

```
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS                    PORTS                                                                 NAMES
1f498d10838f        bigchaindb/bigchaindb:master   "bigchaindb -l DEBUG…"   12 minutes ago      Up 12 minutes (healthy)   0.0.0.0:9984-9985->9984-9985/tcp, 0.0.0.0:32779->26658/tcp            react-boilerplate_bigchaindb_1
f5a528286025        mongo:3.6                      "docker-entrypoint.s…"   12 minutes ago      Up 12 minutes             0.0.0.0:32778->27017/tcp                                              react-boilerplate_mongodb_1
99181b8c236c        tendermint/tendermint:0.22.8   "sh -c 'tendermint i…"   12 minutes ago      Up 12 minutes             46656-46657/tcp, 0.0.0.0:32777->26656/tcp, 0.0.0.0:32776->26657/tcp   react-boilerplate_tendermint_1
```

Which means that the BigchainDB docker port for the API is `9984`.

The external ports might change, so for the following use the ports as indicated by `docker-compose ps`.

You can simply check if it's running by going to `http://localhost:9984`.

To stop BigchainDB run:

```bash
docker-compose stop
```

## Client-side Setup

### Prequisites

For the client you'll need `node` and `npm`: These versions or higher should work:

- `node`: `v8.11.3`
- `npm`: `v5.6.0`

### Install

```
cd client
npm install
```

### Launch

```
npm run start
```

Note that hot reloading is enabled and should pick up all the changes in the `js` and `scss` source.

## BigchainDB JavaScript Driver

see the [js-bigchaindb-driver](https://github.com/bigchaindb/js-bigchaindb-driver) for more details
