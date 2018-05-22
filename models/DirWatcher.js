import fs from 'fs';
import _ from 'lodash';
import {promisify} from 'util';
import {EventEmitter} from 'events';

const readDirPromise = promisify(fs.readdir);

export class DirWatcher {
    constructor() {
        this.emitter = new EventEmitter();
        this.pathsCache = [];
    }

    watch(path, delay = 1000) {
        if (!path) {
            console.log('The path is not specified!');
            return;
        }
        if (this.pathsCache.includes(path)) {
            console.log(`The path ${path} already watching!`);
            return;
        }
        readDirPromise(path)
            .then((files) => {
                _.forEach(files, (item) => {
                    const FILE = `${path}${item}`;
                    fs.watchFile(FILE, {interval: delay}, () => {
                        console.log(`The file ${FILE} has been changed!`);
                        this.emitter.emit('changed', {file: FILE});
                    });
                    this.emitter.emit('register', {file: FILE});
                });
            });
        this.pathsCache.push(path);
        console.log(`The path ${path} is watching!`);
    }

    unwatch(path) {
        if (!path) {
            console.log('The path isn\'t specified!');
            return;
        }
        if (!this.pathsCache.includes(path)) {
            console.log(`The path ${path} isn't watching!`);
            return;
        }

        readDirPromise(path)
            .then((files) => {
                _.forEach(files, (item) => {
                    const FILE = `${path}/${item}`;
                    fs.unwatchFile(FILE);
                    this.emitter.emit('unregister', {file: FILE});
                });
            });
        this.pathsCache.filter(item => (item !== path));
        console.log(`The watching for ${path} has been stopped!`);
    }
}