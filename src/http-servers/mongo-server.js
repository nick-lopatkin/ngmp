import {createServer} from 'http';
import {promisify} from 'util';
import {MongoClient} from 'mongodb';
import lodash from 'lodash';

import citiesData from '../data/cities';

const url = 'mongodb://localhost:27017';
const dbName = 'ngmp';
const mongoConnect = promisify(MongoClient.connect);

const server = cities => createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    cities.find({}).toArray((err, result) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('error');
        }
        res.end(JSON.stringify(lodash.sample(result)));
    });
});

mongoConnect(url)
    .then((client) => {
        console.log('connected to server!');
        return client.db(dbName);
    }).then((db) => {
    let cities = db.collection('cities');
    let test = db.collection('test');
    if (!cities) {
        console.log('no cities!');
        cities = db.createCollection('cities');
    }

    if (!test) {
        console.log('no test!');
        test = db.createCollection('test');
    }

    test.count({}, undefined, (err, count) => {
        if (count === 0) {
            console.log('test zero count!');
            test.insertMany([{"test": true}]);
        }
    });
    cities.count({}, undefined, (err, count) => {
        if (count === 0) {
            console.log('cities zero count!');
            cities.insertMany(citiesData);
        }
    });

    const mongoServer = server(cities);
    mongoServer.listen(8080, () => console.log('mongo server listen on 8080 port'));
    mongoServer.on('close', () => {
        db.close();
    });
}).catch((err) => {
    console.log('connection failed: ', err);
});

export default server;
