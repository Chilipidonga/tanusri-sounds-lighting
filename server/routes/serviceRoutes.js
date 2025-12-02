const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const upload = require('../config/cloudinary');

// Multer Config: Accept 'image' (1 file) AND 'gallery' (up to 10 files)
const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'gallery', maxCount: 10 }
]);

// 1. ADD NEW SERVICE
router.post('/add', uploadFields, async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        if (!req.files || !req.files['image']) {
            return res.status(400).json({ error: 'Main image is required' });
        }

        // Main Image URL
        const mainImage = req.files['image'][0].path;

        // Gallery Images URLs (if any)
        let galleryImages = [];
        if (req.files['gallery']) {
            galleryImages = req.files['gallery'].map(file => file.path);
        }

        const newService = new Service({
            title, description, price, category,
            image: mainImage,
            gallery: galleryImages // Save extra photos
        });

        await newService.save();
        res.status(201).json({ message: 'Service added successfully!', service: newService });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET ALL
router.get('/all', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. UPDATE
router.put('/update/:id', uploadFields, async (req, res) => {
    try {
        const { title, description, category, price } = req.body;
        let updateData = { title, description, category, price };

        // If Main Image Changed
        if (req.files['image']) {
            updateData.image = req.files['image'][0].path;
        }

        // If New Gallery Images Added (Append them to existing)
        if (req.files['gallery']) {
            const newGallery = req.files['gallery'].map(file => file.path);
            // Note: Ippatiki patha gallery replace ayipothundi simple logic kosam
            // Advanced logic lo manam $push vadali, kani idi beginner friendly replace logic
            updateData.gallery = newGallery; 
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json({ message: "Updated Successfully!", service: updatedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// ... Patha code ...

// 5. REMOVE SINGLE GALLERY IMAGE
router.put('/remove-image/:id', async (req, res) => {
    try {
        const { imageUrl } = req.body; // E photo delete cheyyalo dani link
        const serviceId = req.params.id;

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { $pull: { gallery: imageUrl } }, // $pull ante array nundi teeseyyadam
            { new: true }
        );

        res.status(200).json({ message: "Image removed", service: updatedService });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;