const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllEmpController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification Doctor || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

//Get all Employees
router.get('/getAllEmp', authMiddleware, getAllEmpController)

//Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//Booking Availablity
router.post('/booking-availbility',authMiddleware, bookingAvailabilityController)

//Appointments Lists
router.get('/user-appointments', authMiddleware, userAppointmentsController)

module.exports = router;