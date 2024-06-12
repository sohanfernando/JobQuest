const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

router.post('/register', companyController.registerCompany);
router.post('/login', companyController.companyLogin);
router.get('/profile/:companyId',  companyController.getUserData);

router.post('/addJob', companyController.addJob);
router.get('/getAllJobs/:companyId', companyController.getAllJobsByCompany);
router.delete('/deleteJob/:jobId', companyController.deleteJob);
router.put('/updateJob/:jobId', companyController.updateJob);
router.get('/applications/:companyId', companyController.getAllCompanyApplications);
router.put('/applicationsacc/:id', companyController.updatestatusaccept);
router.put('/applicationsrej/:id', companyController.updatestatusrej);
router.put('/profileupdate/:id', companyController.updateCompanyProfile);
router.get('/userdata/:id', companyController.userdata);
router.get('/allJobsByApplicants', companyController.getAllJobsByApplicants);


// api/company/applications/:appId/accept
module.exports = router;
