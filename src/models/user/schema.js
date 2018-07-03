import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 2,
    },
    role: {
        type: String,
        required: true,
        min: 2,
    },
    lastModifiedDate: Date,
});

userSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('User', userSchema);
