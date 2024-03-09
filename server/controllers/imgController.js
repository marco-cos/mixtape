const express = require('express');
const router = express.Router();
const imgSchema = require('../models/img.js');
const fs = require('fs');
const path = require('path');

module.exports.UploadAndRetrieve = async (req, res) => {
    try {
        if (req.method === 'POST') {
            // Upload image
            const imageData = req.file;
            if (!imageData) {
                return res.status(400).send('no image file provided');
            }
            var obj = {
                data: fs.readFileSync(path.join(__dirname, '/uploads/', imageData.filename)),
                contentType: imageData.mimetype
            };
            await imgSchema.create(obj);
            res.status(201).send('Image uploaded successfully');
            // Redirect or respond with success message if needed
        } else if (req.method === 'GET') {
            // Retrieve images
            const data = await imgSchema.find({});
            // Render view or send JSON response with retrieved data
            res.render('imagepage', { items: data });
        } else {
            res.status(405).send('Method Not Allowed');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};


   

