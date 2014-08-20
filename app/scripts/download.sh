#!/bin/bash

cd ../static/img
mkdir -p $3
cd $3
wget -O $2 $1
