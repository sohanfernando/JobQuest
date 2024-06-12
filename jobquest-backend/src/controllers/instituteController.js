const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateInstituteLogin, validateCourse, validateInstituteRegistration} = require('../middleware/validation');
const Course = require('../models/courseModel');
const Institute = require("../models/instituteModel");

exports.registerInstitute = async (req, res) => {
    try {
        const { error } = validateInstituteRegistration(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const existingInstitute = await Institute.findOne({ email: req.body.email });
        if (existingInstitute) return res.status(400).json({ error: 'Institute already registered.' });

        const hashedPassword = await hashPassword(req.body.password);

        const institute = new Institute({
            instituteName: req.body.instituteName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description,
            location: req.body.location,
            websiteUrl: req.body.websiteUrl,
            instituteType: req.body.instituteType
        });

        await institute.save();

        const token = generateToken(institute);

        res.status(201).json({
            token: token,
            instituteName: req.body.instituteName,
            email: req.body.email,
            description: req.body.description,
            location: req.body.location,
            websiteUrl: req.body.websiteUrl,
            instituteType: req.body.instituteType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering institute.' });
    }
};

exports.instituteLogin = async (req, res) => {
    try {
        const { error } = validateInstituteLogin(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const institute = await Institute.findOne({ email: req.body.email });
        if (!institute) return res.status(400).json({ error: 'Invalid email or password.' });

        const validPassword = await comparePassword(req.body.password, institute.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

        const token = generateToken(institute);

        res.json({
            token: token,
            _id: institute._id,
            instituteName: institute.instituteName,
            email: institute.email,
            instituteType: institute.instituteType
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in.' });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { title, description, syllabus, enrollmentCriteria, content } = req.body;

        const institute = await Institute.findById(req.user.id);
        if (!institute) return res.status(404).send('Institute not found');

        const course = new Course({
            institute: institute._id,
            title,
            description,
            syllabus,
            enrollmentCriteria,
            content
        });

        const savedCourse = await course.save();
        institute.courses.push(savedCourse);
        await institute.save();

        res.status(201).json(savedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ institute: req.user.id });
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedCourses = async (req, res) => {
    try {
        const courses = await Course.aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    syllabus: 1,
                    enrollmentCriteria: 1,
                    contentCount: { $size: "$content" }
                }
            },
            {
                $sort: {
                    contentCount: -1
                }
            }
        ]).limit(6);

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getInstituteCourseCount = async (req, res) => {
    try {
        const { instituteId } = req.params;
        const count = await Course.countDocuments({ institute: instituteId });
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.viewInstituteProfile = async (req, res) => {
    try {
        const instituteId = req.params.instituteId;
        const institute = await Institute.findById(instituteId);
        if (!institute) {
            return res.status(404).json({ message: 'Institute profile not found' });
        }
        res.status(200).json(institute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateInstituteProfile = async (req, res) => {
    try {
        const instituteId = req.params.instituteId;
        const updatedInstitute = await Institute.findByIdAndUpdate(instituteId, req.body, { new: true });
        if (!updatedInstitute) {
            return res.status(404).json({ message: 'Institute profile not found' });
        }
        res.status(200).json(updatedInstitute);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};