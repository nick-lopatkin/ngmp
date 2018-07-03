import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        min: [2, 'name must be at least 2 letters'],
    },
    country: {
        type: String,
        required: [true, 'country is required'],
        min: [2, 'country must be at least 2 letters'],
    },
    capital: {
        type: Boolean,
        required: [true, 'capital is required'],
        default: false,
    },
    location: {
        lat: Number,
        long: Number,
    },
    lastModifiedDate: Date,
});

citySchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('City', citySchema);
