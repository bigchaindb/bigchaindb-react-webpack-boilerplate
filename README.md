# BigchainDB + React + Webpack boilerplate 

## Clone
Clone or fork this repo (using submodules)

```bash
git clone git@github.com:bigchaindb/bigchaindb-react-webpack-boilerplate.git my-bigchaindb-project --recursive 
```

and

```bash
cd my-bigchaindb-project
```

Now you can set your remotes to your local app and so forth

## Server-side setup

> Supports BigchainDB Server v0.10 (Warning: use CORS enabled [branch](https://github.com/bigchaindb/bigchaindb/tree/kyber-master-feat-cors) untill [PR #1311](https://github.com/bigchaindb/bigchaindb/pull/1311) is resolved )

First things first. You'll need a (local) BigchainDB server to get going with the API.

If you want run the server locally follow these steps:

### Quickstart with Docker (Windows, OSX, lazy Linux)

#### Prequisites

You must have `docker`, `docker-compose` (and `make`) installed.
These versions or higher should work:

- `docker`: `v1.13.0`
- `docker-compose`: `v1.7.1`

#### Locally launch BigchainDB server and other (sometimes experimental) services 

To spin up the services, simple run the make command, which will orchestrate `docker-compose`

```bash
make
```

This might take a few minutes, perfect moment for a :coffee:!

Once docker-composed has built and launched all services, have a look:

```bash
docker-compose ps
```

```
           Name                         Command               State            Ports
----------------------------------------------------------------------------------------------
mybigchaindbproject_bdb-server_1   bigchaindb start                 Up      0.0.0.0:49984->9984/tcp
mybigchaindbproject_mdb_1          docker-entrypoint.sh mongo ...   Up      0.0.0.0:32773->27017/tcp
```

Which means that the internal docker port for the API is `9984` 
and the external one is `49984`.

The external ports might change, so for the following use the ports as indicated by `docker-compose ps`.

You can simply check if it's running by going to `http://localhost<external-docker-port-bdb-server>`.

If you already built the images and want to `restart`:

```bash
make restart
```

Stop (and remove) the containers with

```bash
make stop
```

#### Launch docker-compose services manually

No make? Launch the services manually:

Launch MongoDB:

```bash
docker-compose up -d mdb
```

Wait about 10 seconds and then launch the server:

```bash
docker-compose up -d bdb-server
```

## Client-side Setup

### Prequisites

For the client you'll need `node` and `npm`: These versions or higher should work:

- `node`: v6.2.2
- `npm`: v3.9.5

### Install

```
cd client
npm install
```

### Launch

```
npm start
```

Note that hot reloading is enabled and should pick up all the changes in the `js` and `scss` source.

## BigchainDB JavaScript Driver

see the [js-bigchaindb-driver](https://github.com/ascribe/js-bigchaindb-driver) for more details
