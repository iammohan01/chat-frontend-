#!/bin/sh

if git tag > /dev/null 2>&1; then
    echo "Repository exists!";
else
    echo "No repository here.";
fi
