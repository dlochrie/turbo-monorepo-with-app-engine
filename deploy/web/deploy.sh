#!/usr/bin/env bash

# The directory name of our app (ex. web, admin, api).
APP_NAME=web

# The directory where our app lives (relative to the build, and src code).
APP_DIR="apps/${APP_NAME}"

# The temp directory for the files we are going to deploy.
BUILD_DIR_ROOT=".deploy"

# The directory where our built/compiled source code goes.
BUILD_APP_DIR="${BUILD_DIR_ROOT}/${APP_DIR}"

# Create the output dir.
rm -rf $BUILD_DIR_ROOT
mkdir $BUILD_DIR_ROOT

# Copy root package.json and lockfile
cp ../../package.json $BUILD_DIR_ROOT
cp ../../package-lock.json $BUILD_DIR_ROOT

# Make a new directory for our app.
rm -rf $BUILD_APP_DIR
mkdir -p $BUILD_APP_DIR

# Copy the apps package.json (this app should NOT have a package-lock.json)
cp "../../$APP_DIR/package.json" $BUILD_APP_DIR

# Copy the "next.config.json" file - we need this for running the server.
cp "../../$APP_DIR/next.config.js" $BUILD_APP_DIR

# Turborepo will do the build for us (fast/caching).
(cd .. && npm run build)

# Copy the build to our app target (GAE will use our package.json for node_modules).
cp -r "../../$APP_DIR/build" $BUILD_APP_DIR

# GAE will run `npm run start`, so we need to set that up for this app.
# Npm allows us a nice way to do this from the CLI.
(cd $BUILD_DIR_ROOT && npm pkg set scripts.start="next start $APP_DIR -p 8080")

gcloud app deploy --appyaml app.yaml $BUILD_DIR_ROOT
