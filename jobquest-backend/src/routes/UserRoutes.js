const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.userLogin);
router.get('/', auth.authenticate, userController.getAllUserData);
router.put('/:userId', auth.authenticate, userController.updateUser);
router.get('/profile', auth.authenticate, userController.getUserData);

router.post('/notes', auth.authenticate, userController.createNote);
router.get('/notes', auth.authenticate, userController.getNotes);
router.put('/notes/:id', auth.authenticate, userController.updateNote);
router.delete('/notes/:id', auth.authenticate, userController.deleteNote);

router.get('/jobs', auth.authenticate, userController.getAllJobs);
router.post('/jobs/:jobId/apply', userController.applyForJob);
router.delete('/jobs/:jobId/application', auth.authenticate, userController.deleteJobApplication);
router.get('/jobs/applied', auth.authenticate, userController.getAppliedJobs);
router.get('/jobs/accepted', auth.authenticate, userController.getAcceptedJobs);
router.get('/jobs/rejected', auth.authenticate, userController.getRejectedJobs);
router.get('/dashboard/counts', auth.authenticate, userController.getJobCounts);

router.post('/courses/:courseId/enroll', auth.authenticate, userController.enrollCourse);
router.get('/courses/enrolled', auth.authenticate, userController.getEnrolledCourses);
router.get('/courses/all', userController.viewAllCourses);
router.get('/courses/enrolled', auth.authenticate, userController.viewUserEnrolledCourses);
router.get('/courses/enrolled/:courseId', auth.authenticate, userController.viewUserEnrolledCourseById);
router.post('/courses/:courseId/unenroll', auth.authenticate, userController.unenrollFromCourse);

router.get('/jobs/all', userController.getAllJobs);
router.get('/courses/all', userController.getAllCourses);

module.exports = router;