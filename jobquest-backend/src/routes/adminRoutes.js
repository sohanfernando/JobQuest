const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.adminLogin);

router.get('/profile', auth.authenticate, adminController.getAdminProfile);
router.put('/profile/update', auth.authenticate, adminController.updateAdminProfile);

router.get('/getAllCompany', adminController.getAllCompanies);
router.get('/getTasks/:id', adminController.getTasks);
router.get('/getAllRecordCount', adminController.getCollectionCounts);
router.post('/addTask', adminController.addTask);
router.delete('/deleteCompany/:companyId', adminController.deleteCompany);
router.put('/updateCompany/:companyId', adminController.updateCompany);
router.get('/getAllInstitutes', adminController.getAllInstitutes);
router.delete('/deleteInstitute/:instituteId', adminController.deleteInstitute);
router.put('/updateInstitute/:instituteId', adminController.updateInstitute);
router.get('/', adminController.getAllAdmins);
router.delete('/:adminId', adminController.deleteAdmin);

module.exports = router;
