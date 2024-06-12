const express = require('express');
const router = express.Router();
const JobApplication = require('../models/applicationModel');
const authMiddleware = require('../middleware/auth');


router.post('/upload-files', authMiddleware.authenticate, async (req, res) => {
    try {
        const { jobId,cv } = req.body;
        const userId = req.user.id;

        const jobApplication = new JobApplication({
            jobId: jobId,
            applicant: userId,
            cvURL: cv
        });

        await jobApplication.save();

        res.status(200).send("Files uploaded successfully");
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).send("Error uploading files");
    }
});

module.exports = router;
