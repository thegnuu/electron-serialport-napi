# Test repo for NAPI rewrite of serialport

To setup the test repo running `yarn` should prepare everything you need.

## Main process

`yarn start:main`

## Renderer process

`yarn start:renderer`

## Setup

`link-serialport.sh` will prepare this repo and link all libs via yarn.
`yarn postinstall` which is executed automatically after `yarn` runs this script as well as `electron-builder install-app-deps` to rebuild the native dependencies for your environment.
