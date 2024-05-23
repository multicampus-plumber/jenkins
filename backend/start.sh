#!/bin/bash

nginx -g daemon off
pm2 start server.js