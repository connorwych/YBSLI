#!/bin/bash

# Check if we've got a new feature branch open
branch=$(<.git/HEAD)
branchname=${branch##*/}

if [ $branchname = "master" ]
then
  echo "Enter new branch name"
  read branchname
  git checkout -b $branchname
fi

# Commit changes to local branch
# git commit -a

# Copy Server Files
# Copy Server Files
echo "cp bin/www ../../node/bin"
cp bin/www ../node/bin

echo "cp app.js ../node"
cp app.js ../node

# Copy conf files
echo "cp conf/* ../node/conf"
cp conf/* ../node/conf

# Copy Lib files
echo "cp -r lib/* ../../node/lib"
cp -r lib/* ../node/lib

 echo "cp -r routes/* ../node/routes"
cp -r routes/* ../node/routes

# Compile CSS and move
echo "--clean-css public/css/less/bootstrap.less > public/css/less/bootstrap.css"
lessc --clean-css public/css/less/bootstrap.less > public/css/less/bootstrap.css
echo  "mv public/css/less/bootstrap.css  ../node/public/css/bootstrap.css"
mv public/css/less/bootstrap.css  ../node/public/css/bootstrap.css

# Copy JS
echo "cp -r public/js/* ../node/public/js"
cd ./public/js
for filename in *.js; do
  echo "  uglifyjs $filename --mangle --compress > ~/Github/ybsli/node/public/js/$filename"
#  uglifyjs $filename --mangle --compress > ../../../node/public/js/$filename
  cp $filename ../../../node/public/js/
done
cd ../../

# Copy view files
echo "cp -r views/* ../../node/views"
cp -r views/* ../node/views

now=$(date +"%T")
echo "Deployment Complete : $now"
