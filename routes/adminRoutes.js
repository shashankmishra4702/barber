const express = require('express')
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');

const router = express.Router()

//GET METHOD FOR USERS
router.get('/getAllUsers', authMiddleware , getAllUsersController)

//GET METHOD FOR BARBERS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//Account Status Route
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

module.exports = router