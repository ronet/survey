const express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    serverUtils = require('./server-utils')
    numCPUs = require('os').cpus().length

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    let i;
    for (i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    serverUtils.mongoose(app);
    // serverUtils.passport(app);
    serverUtils.router(app, __dirname + '/routes');


    app.listen(80, () => {
        console.log('survey is running ');
    })
}