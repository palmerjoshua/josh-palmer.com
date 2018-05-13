#!/usr/bin/env bash
npm run-script prebuild
npm run-script build
if [ $1 ]; then
    serve -s ../build
fi
