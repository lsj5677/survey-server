#!/bin/bash
pm2 start /usr/src/survey-server/ecosystem.config.js --env production 
nginx -g 'daemon off;'