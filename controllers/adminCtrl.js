const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')


//This function retrieves all the users data from MONGODB and store it in users
const getAllUsersController = async(req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data list',
            data:users,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching users',
            error,
        })
    }
};

//This function retrieves all the barbers data from MONGODB and store it in barbers

const getAllDoctorsController = async(req,res) => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success:true,
            message:"Employees Data Lists",
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting employees data',
            error,
        })
    }
};

//Employee Account Status
//This function updates users and make them doctors on the basis of approval of Admin.
//Find the employeeID and its status(Approved,Rejected) and send the notification to the user that his request is sent to the Admin

const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await userModel.findOne({ _id: doctor.userId });
      const notifcation = user.notifcation;
      notifcation.push({
        type: "barber-account-request-updated",
        message: `Your Employees Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };

module.exports = {getAllUsersController, getAllDoctorsController, changeAccountStatusController};