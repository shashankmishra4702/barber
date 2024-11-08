const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController, updateProfileController, getEmpByIdController, doctorAppointmentController, updateStatusController } = require('../controllers/empCtrl')
const router = express.Router()

//Post Single Employee Information
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

//Post Update Profile
router.post('/updateProfile', authMiddleware, updateProfileController)

//Post Single Employee Info
router.post('/getEmpById', authMiddleware, getEmpByIdController)

//Get Appointments
router.get('/doctor-appointments', authMiddleware , doctorAppointmentController)

//Post Update Status
router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router