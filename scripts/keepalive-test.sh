#!/bin/bash
for i in $(seq 1 60); do echo "$(date +%T) alive $i" >> /tmp/keepalive.log; sleep 5; done
