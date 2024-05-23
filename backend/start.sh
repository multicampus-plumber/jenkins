#!/bin/bash

pm2 start server.js
nginx -g daemon off