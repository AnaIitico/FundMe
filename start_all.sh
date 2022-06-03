#!/bin/bash

brownie compile;
brownie run scripts/deploy.py;

cd react/client;
npm start;
