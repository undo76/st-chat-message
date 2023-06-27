#!/usr/bin/env bash

set -e

# Build Frontend
cd st_chat_message/frontend || exit
yarn install
yarn run build

# Build Python package
cd ../..
poetry version patch
poetry build

# Publish to PyPi
#poetry publish --username "$PYPI_USERNAME" --password "$PYPI_PASSWORD"

