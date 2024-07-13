const router = require('express').Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User')

//make a new appointment
router.post('/new', async (req, res) => {
    const { date, doctor, patient, location, title } = req.body;

    try {
        // Create the appointment
        const newAppointment = await Appointment.create({ 
            date: date, 
            doctor: doctor, 
            patient: patient, 
            location: location, 
            title: title 
        });
        // Find the patient (user) and associate the appointment
        const user = await User.findById(patient);
        if (!user) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        user.appointments.push(newAppointment._id);
        await user.save();

        res.status(200).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, {new: true});
        if (!updatedAppointment) {
            return res.status(404).json({message: "Appointment not found"});
        }
        res.json(updatedAppointment);
    } catch (err) {
        res.status(500).json({err: err.message});
    }
})

//old appointment route
// router.post('/new', async (req, res) => {
//     const { date, doctor, patient, location, title } = req.body;

//     Appointment.create({ date: date, doctor: doctor, patient: patient, location: location, title: title }).then(data => {
//         res.status(200).json(data);
//     }).catch((err) => res.status(500).json({error: err.message}))
// })

router.get('/', async (_req, res) => {
    try {
        const appointments = await Appointment.find({})
        res.json(appointments)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const appointments = await Appointment.findById(req.params.id);
        res.json(appointments)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})



router.get('/doctor/:id', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const appointment = await Appointment.find({ doctor: doctorId });
    
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/patient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const appointment = await Appointment.find({ patient: patientId });
    
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/date/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const appointment = await Appointment.find({ date: date });
    
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message})
    }

});


router.get('/location/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const appointment = await Appointment.find({ location: location });
    
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
});

module.exports = router;