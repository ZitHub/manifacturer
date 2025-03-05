# Comstruct Coding Challenge

An application designed to match (and maybe manage) invoices with deliveries. The project is split into two main parts:

- **Backend**: A NestJS application responsible for the business logic and API.
- **Frontend**: A NextJS application for the user interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Documentation](#documentation)
- [Deployment Proposal](#deployment-proposal)

---

## Prerequisites

Make sure these ports are free

- `3000` (frontend)
- `4000` (backend)
- `5432` (postgres)
- `5433` (postgres testing)

## Running the Application

### Locally

1. Switch to node >=20 (needed for NextJS):

```bash
nvm use
```

1. Install concurrently for further setup. It is in the root `package.json`:

```bash
npm install
```

2. Install backend/frontend dependencies:

```bash
npm run setup
```

3. Setup .env files:

```bash
npm run env
```

4. Setup Postgres DB:

```bash
docker-compose up
```

5. Run:

```bash
npm run dev
```

### With Docker

Run the app out of the box with:

```bash
docker-compose --profile dev up --build
```

## Scripts

Linter

```bash
npm run lint
```

Testing

```bash
npm run test
```

Remove builds from backend and frontend

```bash
npm run clean
```

Run to reinitialize database with tables and data

```bash
docker-compose down
docker volume rm comstruct-invoices-deliveries_db_data
docker volume rm comstruct-invoices-deliveries_test_db_data
docker-compose up
```

## Documentation

### Database

Database runs in docker and it is populated by `./db/init.sql` with invoices, deliveries and so on.

Furthermore `fuzzystrmatch` is installed as an extension to be able to use [Levenshtein Distance](https://www.postgresql.org/docs/current/fuzzystrmatch.html#FUZZYSTRMATCH-LEVENSHTEIN) for matching delivery numbers etc.

This is the ER diagram of the database [(from task)](https://comstruct.notion.site/Coding-Challenge-Overview-6c0e3337aa0a41a1855e6de69ad0655b)

![alt text](./diagrams/er-diagram.png)

### System

Its a setup with

- NextJS as frontend
- NestJS as backend
- Postgres DB
- Postgres testing DB

![alt text](./diagrams/system.png)

### Design

#### Frontend

Using NextJS and Material UI for the design of collapsible table.

- Rows are organized by invoice ids
- Each invoice has >=1 deliveries
- Deliveries can have multiple items
- Each item has its own row with
  - invoice line item details
  - delivery line item details
  - alerts
- Alerts indicate if invoice and delivery items are a perfect match, a fuzzy match or there is no match

#### Backend

Using NestJS with Postgres as database.

Own module for invoice-matching using SQL queries as main means for matching invoice line items to delivery line items. It is because

- databases queries are already optimized well
- for large amount of data, we do not want to do the matching in memory
- fuzzy match is available

The matching algorithm works as follows:

- checks for exact matches (unit, delivery number, title etc.)
- if some items remain unmatched, fuzzy matching is used on the remaining items. This is more expensive than an exact match based on delivery number and title, making it a fallback option
- it annotates items with some data, e.g. if its a fuzzy match or units are different
- it concats exact matches, fuzzy matches and no matches and returns it as a flat object, which can be later reorganized by frontend or anyone who wants to consume it

#### Testing

Since SQL is taking care of most of the matching function, it is a good option to set up a testing database and use that for testing instead of mocking results from the query.

#### CI/CD

Frontend and Backend are containerized via Dockerfiles. Created a small feature github workflow for feature branches, that checks

- linting
- tests
- build

on each push. For testing, it uses a postgres database service that is fed with test data.

### Deployment Proposal

So far, there are Dockefiles and a github-actions workflow for feature branches. I will explain how I would deploy this on Google Cloud.

- Assuming there is already a GKE cluster
- Assuming there is a dev, stage and production environment
- Assuming there is monitoring in place
- Separate Frontend and Backend into their own repos
- Deploy Postgres DB somewhere cheaper or with better support than what GCP offers
- Create Namespaces, Deployments, Services, ConfigMap, Ingress k8s manifests for Backend + Frontend
- Put manifests into a Helm chart (or use GitOps if we have many services), values should correspond to different environments
- Remove secrets that have been committed to GitHub e.g. db password and move them to GCP Secret Manager
- Use [ESO](https://external-secrets.io/latest/) or something else to mount secrets into pods (needs [federation](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity))
- [Federate](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity) GitHub to access GKE cluster
- Create stage and production workflows based on `.github/workflows/feat.yml`
- Stage workflow should reuse `feat.yml` and additionally build Dockerfile and push to an artifact repo with `staging` tag. Furthermore it should apply the Helm chart on GKE
- Production workflow should reuse `feat.yml` and additionally build Dockerfile and push to an artifact repo with `latest` tag. Furthermore it should apply the Helm chart on GKE. This one should be triggered manually with `workflow_dispatch` configured and be triggered by tagging on GitHub.
