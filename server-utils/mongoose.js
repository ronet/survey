const mongoose = require('mongoose'),
    schemas = require('../schemas');

module.exports = (app) => {

    const mongo = {
        host: 'localhost',
        port: 27017,
        user: 'root',
        database: 'pjt',
    }
    const setting = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }

    mongoose.connect(`mongodb://${mongo.host}:${mongo.port}/${mongo.database}`, setting);

    Object.entries(schemas).forEach(([key, value]) => {
        mongoose.model(key, new mongoose.Schema(value))
    })

    // Object.keys(schemas).forEach((key) => {
    //     mongoose[key] = mongoose.model(key, new mongoose.Schema(schemas[key]));
    // })
    app.set('mongoose', mongoose);
}