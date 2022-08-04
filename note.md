### terminal check node version

    node -v

### start node server

    node <filename>
    pwd

### stop node server

    control + c

### install express

    npm install express

### mongoDB Cloud

    https://cloud.mongodb.com/v2/62ec151d2f4bb305a58d7864#clusters/edit?filter=starter&fromPathSelector=true
    email: andy741231@hotmail.com
    pw: a126375745

    connection
    Whitelist -> Add ip address: 0.0.0.0/0
    (allow any ip address)
    create db users
    connect your application
    connectionstring will be available

### Install mongoDB locally

    Install Docker: https://www.docker.com/products/docker-desktop/
    open host-mongo-locally folder
    commandline: docker compose up
    docker-compose.yml file will configure mongoDB instance in Docker

    To view/manage mongoDB use mongoDB Compass: https://www.mongodb.com/products/compass
    connect using connectionstring.txt
    update the db name in with connectionstring.txt for node.js connection

    to start docker:
    docker compose start

    to stop:
    docker compose stop

    can also do the same thing in docker app

### Install mongoDB for node.js

    npm install mongodb
    let {MongoClient} = require('mongodb')
    let db


    // use await because need to wait for anyname.connect() before db=client.db(). need to put them in async to use await
    async function go() {
        let anyname = new MongoClient('connectionstring')
        await anyname.connect()
        db = anyname.db()
        app.listen(3000)
    }

    go()

### Create package.json

    npm init -y

### install nodemon

    * npm install -D nodemon
    * go to package.json

        "scripts": {
        "dev": "nodemon --ignore feedback.json server.js"
    },

    * npm run dev
