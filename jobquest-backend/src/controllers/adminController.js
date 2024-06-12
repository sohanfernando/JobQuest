const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateAdminRegistration, validateAdminLogin, validateJob, validateTask} = require('../middleware/validation');
const Admin = require('../models/adminModel');
const Company = require('../models/companyModel');
const Institute = require("../models/instituteModel");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const Courses = require("../models/courseModel");
const Job = require("../models/jobModel");
const {connection} = require("mongoose");

exports.registerAdmin = async (req, res) => {
    try {
        const { error } = validateAdminRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) return res.status(400).send('Admin already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const admin = new Admin({
            adminName: req.body.adminName,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });

        await admin.save();

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering admin.');
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { error } = validateAdminLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, admin.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const updates = req.body;
        const options = { new: true };
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, options);
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error("Error updating admin profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        await Company.findByIdAndDelete(companyId);
        res.status(200).send("Company deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting company.");
    }
};

exports.deleteInstitute = async (req, res) => {
    try {
        const instituteId = req.params.instituteId;
        await Institute.findByIdAndDelete(instituteId);
        res.status(200).send("Institute deleted successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting institute.");
    }
};


exports.updateCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const updatedCompany = await Company.findByIdAndUpdate(companyId, req.body, { new: true });
        res.status(200).send(updatedCompany);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating company.");
    }
};


exports.updateInstitute = async (req, res) => {
    try {
        const instituteId = req.params.instituteId;
        const updatedInstitute = await Institute.findByIdAndUpdate(instituteId, req.body, { new: true });
        res.status(200).send(updatedInstitute);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating institute.");
    }
};


exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).send(companies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching companies.");
    }
};


exports.getAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find();
        res.status(200).send(institutes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching institutes.");
    }
};

exports.addTask = async (req, res) => {
    try{

        console.log('user',req.body);
        const task = new Task({
            task: req.body.task,
            date: req.body.date,
            user: req.body.userid
        });

        await task.save();

        res.status(201).send(task);
    }catch (error){
        console.error(error);
        res.status(500).send('Error adding job.');
    }
}

exports.getTasks = async (req, res) => {
    try {
        const userId = req.params.id;
        const tasks = await Task.find({ user: userId });
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tasks.');
    }
};

exports.getCollectionCounts = async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        const companyCount = await Company.countDocuments();
        const user = await User.countDocuments();
        const instituteCount = await Institute.countDocuments();
        const taskCount = await Task.countDocuments();
        const courses = await Courses.countDocuments();
        const jobCount = await Job.countDocuments();

        const counts = {
            adminCount: adminCount,
            companyCount: companyCount,
            instituteCount: instituteCount,
            taskCount: taskCount,
            userCount: user,
            courses: courses,
            jobCount: jobCount
        };

        res.status(200).send(counts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching collection counts.");
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ error: "Failed to fetch admins" });
    }
};

exports.deleteAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        await Admin.findByIdAndDelete(adminId);
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ error: "Failed to delete admin" });
    }
};

