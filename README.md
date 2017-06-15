# Micropost
A simple meteor application demo

View live demo on https://micropost.view-this.info

## Test
```
  meteor test --driver-package practicalmeteor:mocha
```

## Deployment
### Run locally

* Dependencies: node, meteor

1. Install the packages
```
  npm install
```
2. Run the meteor application
```
  meteor
```


### Run on server

* Dependencies: node, meteor, mongo

1. Build the meteor application. This will output a file named micropost.tar.gz. You may change the output path. 
```
meteor build --architecture=os.linux.x86_64 .
```
2. Extract the output file micropost.tar.gz. It will extract a directory called bundle
```
  tar -zxvf micropost.tar.gz
```
3. Go to the bundle's server directory
```
  cd /bundle/programs/server
```
4. Install the packages
```
  npm install
```
5. Setup Environment variables for meteor. Check [Meteor Docs](https://docs.meteor.com/environment-variables.html)
```
    MONGO_URL='mongodb://<mongo_host>/<app>'
    ROOT_URL='http://localhost'
    PORT='80'
    ...
```
6. Run the application
```
  node /bundle/main.js
```


### Run on Docker

* Dependencies: node, meteor, docker

1. Build the meteor application. This will output a file named micropost.tar.gz
```
  meteor build --architecture=os.linux.x86_64 .
```
2. Extract the output file micropost.tar.gz. It will extract a directory called bundle
```
  tar -zxvf micropost.tar.gz
```
3. Update docker-compose.yml with the your volume paths and environment variables.
4. Run the container
```
  docker-compose up
```



