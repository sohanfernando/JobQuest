const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');
const User = require('../models/userModel');
const Job = require('../models/jobModel');
const Note = require('../models/scheduleModel');
const Course = require('../models/courseModel');

exports.registerUser = async (req, res) => {
    try {
        const { error } = validateUserRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send('User already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });

        await user.save();

        const token = generateToken(user);

        res.header('x-auth-token', token).send({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user.');
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { error } = validateUserLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email.');

        const validPassword = await comparePassword(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');

        const token = generateToken(user);

        res.header('x-auth-token', token).send({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};



exports.getAllUserData = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data.');
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user.');
    }
};

exports.getUserData = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).send('User not found.');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data.');
    }
};

// --------- note book -----------
exports.createNote = async (req, res) => {
    try {
        const { date, content } = req.body;
        const newNote = new Note({
            date: new Date(date),
            content,
            user: req.user.id
        });
        const savedNote = await newNote.save();
        res.status(201).json({ note: savedNote });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateNote = async (req, res) => {
    const { content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update note' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete note' });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ------------------ Job ----------------------


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate('company');

        console.log('Populated jobs:', jobs);

        const updatedJobs = await Promise.all(jobs.map(async job => {
            if (job.company) {
                job.company = job.company.companyName;
            }
            return job;
        }));

        res.json(updatedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { userId, cvURL } = req.body;
        const applicationDate = new Date();

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const isAlreadyApplied = job.applicants.some(applicant => applicant.applicant.toString() === userId);
        if (isAlreadyApplied) {
            return res.status(400).send('You have already applied for this job');
        }

        job.applicants.push({
            applicant: userId,
            cvURL: cvURL,
            applicationDate: applicationDate,
            status: 'pending'
        });

        await job.save();

        res.status(200).send('Job application submitted successfully');
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.deleteJobApplication = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const index = job.applicants.findIndex(applicant => applicant.applicant.toString() === userId);
        if (index === -1) {
            return res.status(404).send('You have not applied for this job');
        }

        job.applicants.splice(index, 1);
        await job.save();

        res.status(200).send('Job application deleted successfully');
    } catch (error) {
        console.error('Error deleting job application:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const appliedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'pending'
        }).populate('company', 'companyName');

        res.json(appliedJobs);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAcceptedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const acceptedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'accepted'
        }).populate('company', 'companyName');

        res.json(acceptedJobs);
    } catch (error) {
        console.error('Error fetching accepted jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getRejectedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const rejectedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'rejected'
        }).populate('company', 'companyName');

        res.json(rejectedJobs);
    } catch (error) {
        console.error('Error fetching rejected jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getJobCounts = async (req, res) => {
    try {
        const userId = req.user.id;

        const appliedCount = await Job.countDocuments({
            'applicants.applicant': userId,
            'applicants.status': 'pending'
        });

        const acceptedCount = await Job.countDocuments({
            'applicants.applicant': userId,
            'applicants.status': 'accepted'
        });

        const rejectedCount = await Job.countDocuments({
            'applicants.applicant': userId,
            'applicants.status': 'rejected'
        });

        res.json({ applied: appliedCount, accepted: acceptedCount, rejected: rejectedCount });
    } catch (error) {
        console.error('Error fetching job counts:', error);
        res.status(500).send('Internal Server Error');
    }
};


// --------------  Course ----------------------------
exports.enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).send('User is already enrolled in this course');
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).send('Enrolled in course successfully');
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('enrolledCourses', {});
        res.json(user.enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('institute', 'name');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewUserEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('enrolledCourses', 'title');
        res.json(user.enrolledCourses);
    } catch (error) {
        console.error('Error fetching user enrolled courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewUserEnrolledCourseById = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        if (!user.enrolledCourses.includes(courseId)) {
            return res.status(400).send('User is not enrolled in this course');
        }

        res.json(course);
    } catch (error) {
        console.error('Error fetching user enrolled course details:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.unenrollFromCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== courseId);
        await user.save();

        res.status(200).send('Unenrolled from course successfully');
    } catch (error) {
        console.error('Error unenrolling from course:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

