const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const Immunization = require("../models/Immunization.js");
const Appointment = require('../models/Appointment');
const jwt = require('../middleware/jwt');

//get all users
router.get('/', async (_req, res) => {
    try {
        const users = await User.find({}).populate('immunizations').populate('appointments');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all patients
router.get('/patients', async (_req, res) => {
    try {
        const patients = await User.find({ role: 'Patient' }).populate('immunizations').populate('appointments');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all doctors
router.get('/doctors', async (_req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' }, 'name');
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//profile to see if authenticated
router.get('/profile', jwt, (req, res) => {
	res.json(req.user);
});

// Route to get user details by ID
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).populate('immunizations').populate('appointments');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Add a new user
router.post('/', async (req, res) => {
	const {name, email, age, sex, medications, lab_reports, role} = req.body;
	try {
		const newUser = await User.create({
			name: name, 
			email: email,
			age: age, 
			sex: sex, 
			medications: medications, 
			immunizations: [], 
			appointments: [], 
			lab_reports: lab_reports, 
			role: role
		});



		res.status(201).json(newUser);
	} catch (error) {
		console.error('Error adding user:', error);
		res.status(500).json({ error: 'Server error' });
	}
});


//update user and add drug
router.put('/:userId/addDrug', async (req, res) => {
	const { userId } = req.params;
	const { drugName, dosage, frequency } = req.body;
  
	try {
	  // Find the user by userId
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  // Add the drug to the user's medications array
	  user.medications.push({ drugName, dosage, frequency });
	  
	  // Save the updated user
	  await user.save();
  
	  // Return the updated user object
	  res.json(user);
	} catch (error) {
	  console.error('Error adding drug to user:', error);
	  res.status(500).json({ error: 'Server error' });
	}
  });

// Update the patient data
router.put('/:userId', async (req, res) => {
	const { userId } = req.params;
	const updateData = req.body;
	const appointmentToSave = updateData.appointments.pop()
	try {
		const newAppointment = await Appointment.create(appointmentToSave);
		updateData.appointments.map(appt => appt._id)
		updateData.appointments.push(newAppointment._id)
		// find the user by their userId and update it with the new data
		const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
  
	  // return the updated user
	  res.json(user);
	  
	  //if there is an error console log it
	} catch (error) {
	  console.error('Error updating user:', error);
	  res.status(500).json({ error: 'Server error' });
	}
  });

  // make a new immunization and assign it to a user
router.post('/:userId/immunizations', async (req, res) => {
	const { userId } = req.params;
	const { name, date, next } = req.body;
  
	try {
	  // first find the user by userId
	  const user = await User.findById(userId);
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  // create a new immunization
	  const newImmunization = new Immunization({
		name,
		date,
		next,
	  });
  
	  // save the immunization
	  await newImmunization.save();
  
	  // assign the immunization to the user
	  user.immunizations.push(newImmunization._id);
	  await user.save();
  
	  // return the new immunization
	  res.status(201).json(newImmunization);

	  //error handling in case of server error
	} catch (error) {
	  console.error('Error creating immunization:', error);
	  res.status(500).json({ error: 'Server error' });
	}
  });

module.exports = router;