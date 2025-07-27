# Typesense UI (Beta) [Typesense v26.0 Compatible](https://typesense.org/docs/26.0/api/)

An OpenSource user interface for Typesense self-hosted instance.

> All the available features are compatible with Typesense version 26.0

## Start Locally

### Start Typesense Server

#### Step 1: Clone the repo

```bash
git clone https://github.com/BadgerBloke/typesense-ui.git
```

#### Step 2: Goto Scripts

```bash
cd typesense-ui/scripts
```

#### Step 3: Create `.env` file

```bash
cp .env-example .env
```

you can change the values in `.env`

#### Step 4: Start Typesense server

```bash
docker compose up -d
```

#### Step 5: Check Typesense is up and running

[http://localhost:8108/health](http://localhost:8108/health)
_In case you have changed the value in `Step 3` then change the value here as well._

---

### Start Typesense-UI

#### Goto `typesense-ui` root directory

```bash
cd ..
```

#### Step 2: Create `.env` file

```bash
cp .env-example .env
```

_In case you have changed the values in `Typesense Step 3` then update the same
here as well._

#### Step 3: Install NextJS dependencies

```bash
bun i
```

_In case you are not using `bun` then delete `bun.lockb` and run the
dependencies installation command accordingly._

#### Step 4: Start the App

```bash
bun dev
```

_Run the command according to your package manager if not using `bun`_

#### Step 5: Visit [http://localhost:3000](http://localhost:3000)

---

## Authentication

Currently, there is two authentication providers supported.

- Keycloak
- Okta

If you want any other authentication provider to be supported, then you can raise a feature request [here](https://github.com/BadgerBloke/typesense-ui/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)

Whichever authentication providers' environment variables are set only those will appear on the login page.

You can check the `.env-example` file for the environment variables.

---

## Production Deployment

Download the latest release code from [here](https://github.com/BadgerBloke/typesense-ui/releases/latest) and then extract the files.

Set the proper environment variables either in `.env` or make it available in
the environment by exporting the variables. Now, you can build the docker image
using following command and then use the same.

> The point is that for self-hosting this NextJS app, you can use this Dockerfile to build the image.

```bash
docker build -t typesense-ui .
```

---

- [Official Typesense installation doc](https://typesense.org/docs/guide/install-typesense.html#docker-compose)

> ### Example pages

- Dashboard
  [!dashboard](./public/images/dashboard.png)

- Documents List
  [!documents](./public/images/documents.png)

- Index Document
  [!add document](./public/images/add-document.png)

- Create New Collection
  [!create collection](./public/images/add-collection.png)

- Settings
  [!settings - page](./public/images/settings.png)

- Crete API Key
  [!create api key](./public/images/create-api-key.png)
