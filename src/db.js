import mongoose from 'mongoose';

mongoose.Promise = Promise;
const url = 'mongodb://localhost:27017/ngmp';
const db = mongoose.connect(url);

export default db;
