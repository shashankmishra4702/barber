const appointmentModel = require('../models/appointmentModel')
const doctorModel = require('../models/doctorModel')
const userModel = require("../models/userModels");
// const appointmentModel = require("../models/appointmentModel");
const getDoctorInfoController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success:true,
            message:'Data Fetch Success',
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Fetching Employees Details',
        })
    }
}

//Update Employee Profile
const updateProfileController = async (req, res) => {
    try {
      const doctor = await doctorModel.findOneAndUpdate(
        { userId: req.body.userId },
        req.body
      );
      res.status(201).send({
        success: true,
        message: "Employee Profile Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Employee Profile Update issue",
        error,
      });
    }
  };

//Get Single Employee
const getEmpByIdController = async(req,res) => {
  try {
    const doctor = await doctorModel.findOne({_id:req.body.doctorId})
    res.status(200).send({
      success:true,
      message:'Employee Infromation Fetched',
      data:doctor,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error in Employee Information'
    })
  }
}

const doctorAppointmentController = async(req,res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Barber Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Barber Appointments",
    });
  }
}

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `Your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In the Update Status",
    });
  }
};

module.exports = {getDoctorInfoController, updateProfileController, getEmpByIdController, doctorAppointmentController, updateStatusController,};