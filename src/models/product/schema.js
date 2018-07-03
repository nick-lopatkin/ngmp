import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 2,
    },
    reviews: {
        type: [String],
        required: false,
    },
    lastModifiedDate: Date,
});

productSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('Product', productSchema);
