import {createReadStream, createWriteStream} from 'fs';
import {promisify} from 'util';
import minimist from 'minimist';
import through from 'through2';
import _ from 'lodash';
import split from 'split2';

const getFileExtension = file => file.split('.').pop();
const getFileName = file => file.slice(0, file.lastIndexOf('.'));

const parseCSV = () => {
    let templateKeys = [];
    let parseHeadline = true;

    return through.obj((data, enc, cb) => {
        if (parseHeadline) {
            templateKeys = data.toString().split(',');
            parseHeadline = false;
            return cb(null, null);
        }

        const entries = data.toString().split(',');
        const obj = {};
        templateKeys.forEach((el, index) => {
            obj[el] = entries[index];
        });

        return cb(null, obj);
    });
};

const toJSON = () => {
    const obj = [];

    return through.obj(function (data, enc, cb) {
        obj.push(data);
        cb(null, null);
    }, function (cb) {
        this.push(JSON.stringify(obj));
        cb();
    });
};

const reverseString = () => through(
    (buffer, enc, cb) => cb(
        null, buffer.toString().split('').reverse().join('')
    )
);

const toUpperCase = () => through(
    (buffer, enc, cb) => cb(
        null, _.toUpper(buffer.toString())
    )
);

function checkIfCsv(file) {
    if (getFileExtension(file) !== 'csv') {
        throw new Error(`${file} isn't csv-file`);
    }
}

function printHelpMessage(err) {
    console.error(err.message);

    return createReadStream(`${__dirname}/helpMsg.txt`)
        .pipe(process.stderr);
}

// Main actions to be called

function reverse() {
    return process.stdin
        .pipe(reverseString())
        .pipe(process.stdout);
}

function transform() {
    return process.stdin
        .pipe(toUpperCase())
        .pipe(process.stdout);
}

function outputFile(filePath) {
    return createReadStream(filePath)
        .pipe(process.stdout);
}

function convertFromFile(filePath) {
    checkIfCsv(filePath);

    return createReadStream(filePath)
        .pipe(split())
        .pipe(parseCSV())
        .pipe(toJSON())
        .pipe(process.stdout);
}

function convertToFile(filePath) {
    checkIfCsv(filePath);

    const writeStream = createWriteStream(`${getFileName(filePath)}.json`);

    return createReadStream(filePath)
        .pipe(split())
        .pipe(parseCSV())
        .pipe(toJSON())
        .pipe(writeStream);
}

function handleCommandLine(argv) {
    if (argv.help || argv.h) {
        return printHelpMessage();
    }

    const action = argv.action || argv.a;
    const filePath = argv.file || argv.f;

    try {
        switch (action) {
            case 'reverse':
                return reverse();
            case 'transform':
                return transform();
            case 'output-file':
                return outputFile(filePath);
            case 'convert-from-file':
                return convertFromFile(filePath);
            case 'convert-to-file':
                return convertToFile(filePath);
            default:
                throw new Error(action);
        }
    } catch (e) {
        return printHelpMessage(e);
    }
}

handleCommandLine(minimist(process.argv.slice(2)));
