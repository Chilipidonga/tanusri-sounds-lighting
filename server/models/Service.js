const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Lighting', 'Sound', 'Stage'],
        required: true 
    },
    image: { type: String, required: true }, // Main Cover Photo (Thumbnail)
    gallery: [{ type: String }] // <--- NEW: Extra Photos List
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);