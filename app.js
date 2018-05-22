import config from './config/config';
import {
    DirWatcher,
    Importer,
    Product,
    User,
} from "./models";

console.log(config.name);

const product = new Product();
const user = new User();

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data/', 2000);
const importer = new Importer(dirWatcher);
