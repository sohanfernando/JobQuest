const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');
const auth = require('../middleware/auth');

router.post('/register', instituteController.registerInstitute);
router.post('/login', instituteController.instituteLogin);


router.post('/course', auth.authenticate, instituteController.createCourse);
router.get('/getAllCourses', auth.authenticate, instituteController.getAllCourses);
router.put('/courses/:id', auth.authenticate, instituteController.updateCourse);
router.delete('/courses/:id', auth.authenticate, instituteController.deleteCourse);

router.get('/institute/:instituteId/courseCount', instituteController.getInstituteCourseCount);
router.get('/featured-courses', instituteController.getFeaturedCourses);
router.get('/:instituteId/profile', instituteController.viewInstituteProfile);
router.put('/:instituteId/profile', instituteController.updateInstituteProfile);

module.exports = router;
