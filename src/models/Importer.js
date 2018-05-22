import fs from 'fs';
import parse from 'csv-parse';
import {promisify} from 'util';
import {DirWatcher} from './index';

const readFilePromise = promisify(fs.readFile);
const parserPromise = promisify(parse);

export class Importer {
    constructor(dirWatcher) {
        if (!dirWatcher || !(dirWatcher instanceof DirWatcher)) {
            throw new Error('DirWatcher didn\'t register in Importer');
        }
        this.emitter = dirWatcher.emitter;
        this.dataMap = new Map();

        this.register = this.register.bind(this);
        this.change = this.change.bind(this);
        this.unregister = this.unregister.bind(this);

        this.emitter.on('register', this.register);
        this.emitter.on('changed', this.change);
        this.emitter.on('unregister', this.unregister);
    }

    static load(file) {
        return readFilePromise(file)
            .then(rawData => parserPromise(rawData, {columns: true}));
    }

    register(event) {
        const {file} = event;
        Importer.load(file)
            .then((data) => {
                console.log('data: ', data);
                this.dataMap.set(file, data);
            });
    }

    change(event) {
        const {file} = event;
        if (!this.dataMap.has(file)) {
            throw new Error(`The file ${file} not contains in Importer`);
        }
        Importer.load(file)
            .then((data) => {
                console.log('changed data: ', data);
                this.dataMap.set(file, data);
            });
    }

    unregister(event) {
        this.dataMap.delete(event.file);
    }

    import(path) {
        return Promise.resolve(this.dataMap.get(path));
    }

    importSync(path) {
        return this.dataMap.get(path);
    }

    clear() {
        this.emitter.removeListener('register', this.register);
        this.emitter.removeListener('changed', this.change);
        this.emitter.removeListener('unregister', this.unregister);
        console.log('The Importer object has been cleaned!');
    }
}