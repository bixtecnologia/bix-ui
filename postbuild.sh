#!/bin/bash

if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "win32" ]]; then
    chmod +x ./dist/cli/index.js
    echo "chmod applied to make CLI executable"
else
    echo "Running on Windows or similar, no chmod needed"
fi
