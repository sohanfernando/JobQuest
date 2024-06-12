const auth = require('../middleware/auth');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateCompanyRegistration, validateCompanyLogin, validateJob } = require('../middleware/validation');
const Company = require('../models/companyModel');
const Job = require('../models/jobModel');
const User = require('../models/userModel');

const JobApplication = require('../models/applicationModel');

exports.registerCompany = async (req, res) => {
    try {
        const { error } = validateCompanyRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingCompany = await Company.findOne({ email: req.body.email });
        if (existingCompany) return res.status(400).send('Company already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const company = new Company({
            companyName: req.body.companyName,
            email: req.body.email,
            password: hashedPassword,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry,
            companyType: req.body.companyType
        });

        await company.save();

        const token = generateToken(company);

        res.header('x-auth-token', token).send({
            companyName: req.body.companyName,
            email: req.body.email,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry,
            companyType: req.body.companyType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering company.');
    }
};

exports.companyLogin = async (req, res) => {
    try {
        const { error } = validateCompanyLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const company = await Company.findOne({ email: req.body.email });
        if (!company) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, company.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(company);

        res.header('x-auth-token', token).send({
            _id: company._id,
            companyName: company.companyName,
            email: company.email,
            userType: company.companyType,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};

exports.addJob = async (req, res) => {
    try {

        const job = new Job({
            company: req.body.company,
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            industry: req.body.industry
        });

        await job.save();

        res.status(201).send(job);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding job.');
    }
};

exports.getAllJobsByCompany = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        const jobs = await Job.find({ company: companyId });

        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching jobs');
    }
};

exports.getAllJobsByApplicants = async (req, res) => {
    try {
        const companyId = req.user.id;
        const jobs = await Job.find({ company: companyId }).populate('applicants.applicant', 'userName email'); // Populate applicant details

        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs by applicants:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        await Job.findByIdAndDelete(jobId);

        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting job" });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const updateFields = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateFields, { new: true });

        res.json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating job" });
    }
};


exports.getAllCompanyApplications = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const applications = await Job.find({ company:companyId })
        res.json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching company applications" });
    }
};
exports.getUserData = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const company = await Company.findById(companyId).select('-password');

        if (!company) {
            return res.status(404).send('company not found.');
        }

        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching company data.');
    }
};


exports.updatestatusaccept = async (req, res) => {
    try {
        const appId = req.params.id;

        const application  = await Job.findById( appId )

        if (!application ) {
            return res.status(404).send('applicant not found.');
        }
        application.applicants[0].status = 'accepted';
        await application.save();
        res.json({ message: 'Application status updated to accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching company data.');
    }
};


exports.updatestatusrej = async (req, res) => {
    try {
        const appId = req.params.id;

        const application  = await Job.findById( appId )

        if (!application ) {
            return res.status(404).send('applicant not found.');
        }
        application.applicants[0].status = 'rejected';
        await application.save();
        res.json({ message: 'Application status updated to accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching company data.');
    }
};

exports.updateCompanyProfile = async (req, res) => {
    try {
        const companyId = req.params.id;
        const updatedData = req.body; 

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).send('Company not found.');
        }

        company.companyName = updatedData.companyName;
        company.email = updatedData.email;
        company.companyType = updatedData.companyType;
        company.location = updatedData.location;
        company.industry = updatedData.industry;
        company.description = updatedData.description;

        await company.save();

        res.json({ message: 'Company profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating company profile.');
    }
};



exports.userdata = async (req, res) => {
    try {
        const userId = req.params.id;
        const user  = await User.findById( userId )
        if (!user ) {
            return res.status(404).send('applicant not found.');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching company data.');
    }
};
