# Turborepo on Google App Engine Starter

> This app was this app was built using the `create-turbo` script.
>
> See: https://turbo.build/repo/docs/getting-started/create-new#quickstart

Monorepo's are all the rage these days, and deploying them can often be confusing, especially with
all the various cloud options available.

This repo is used to demonstrate how one might upload a monorepo with 2 Next.js frontend apps (_web_
and _admin_), a shared API built with Express, and common components, linting, and dependencies.

Our Next.js apps will be using a common React component from the `common` package. All three apps
will be using a TS Type from the `common` package.

We will be using:
- [Turborepo](https://turbo.build/repo) for build and scripts.
- [Next.js](https://nextjs.org/) for our Web and Admin apps.
- [Express](https://expressjs.com/) for our API.

Why Google App Engine? It's super cheap to get started (for dev purposes it might cost you pennies),
it scales automatically, and it's pretty easy to set up.

To get set up with Google App Engine, start [here](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/).

## Deployment

**NOTE**: The build script can be easily converted to a Dockerfile if your deployment strategy requires
Docker containers.

For now, we are using Google App Engine to host our applications, but we can easily move to
Kubernetes, or any service that supports Docker containers. The only real changes to make would be
to essentially port over the scripting we do in our `deploy` script to Docker.

Turborepo has some easy docks on
[deploying with Docker](https://turbo.build/repo/docs/handbook/deploying-with-docker).

Each app has its own deployment setup in `deploy` directory. Since we are using Google App Engine,
these deploy directories each have:

1. `.gcloudignore` - Tells GAE which files/dir to ignore during deploy upload.
2. `.gitignore` - Tells `git` which files/dir to ignore.
3. `app.yaml` - GAE config for this application.
4. `deploy.sh`* - The actual deploy script.

> NOTE: `deploy.sh`* could potentially change to a Node.js script in the future, but it will
> essentially do the same thing.

The `deploy` script basically bundles our `package.json` (both root and app-specific),
`package-lock.json`, the `next.config` (for Next apps so they know where the build lives), and the
build directory itself. This is all that's require to get GAE up and running, for Next.js and Node.

You can run deployments like so:

```bash
npm run deploy:web
npm run deploy:admin
npm run deploy:api
```

Or:

```bash
(cd deploy/web && ./deploy.sh)
(cd deploy/admin && ./deploy.sh)
(cd deploy/api && ./deploy.sh)
```

You basically get:

- _Web_ https://<YOURAPPNAME>.x.y.appspot.com
- _Admin_ https://admin-dot-<YOURAPPNAME>.x.y.appspot.com
- _API_ https://<YOURAPPNAME>.x.y.appspot.com/app

## Development

Both **Web** and **Admin** are using Next.js. They build to the `build` directory, and not `.next`.

The **API** app is built using Express, and it also builds to `build`.

## Helpful Docs

Here are some insightful articles that were helpful in development:

### Things about Turborepo you might need to know:

_Really helpful with installing dependencies, and more._

https://dev.to/_gdelgado/pitfalls-when-adding-turborepo-to-your-project-4cel

### Deploying Next.js to AppEngine

https://github.com/vercel/next.js/discussions/12474
