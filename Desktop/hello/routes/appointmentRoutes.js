const express = require('express');

const Appointment = require('../models/Appointment');

const { ensureAuth } = require('../middleware/auth');

const router = express.Router();

const buildAppointmentData = (body) => {
  return {
    patientName: body.patientName,
    doctorName: body.doctorName,
    department: body.department,
    appointmentDate: body.appointmentDate,
    appointmentTime: body.appointmentTime,
    status: body.status,
    notes: body.notes,
  };
};

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const { search, status, department } = req.query;

    const query = {};

    if (search && search.trim() !== '') {
      query.$or = [
        { patientName: { $regex: search.trim(), $options: 'i' } },
        { doctorName: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (department && department !== 'All') {
      query.department = department;
    }

    const appointments = await Appointment.find(query).sort({
      createdAt: -1,
    });

    const departments = await Appointment.distinct('department');

    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
    const confirmedAppointments = await Appointment.countDocuments({ status: 'Confirmed' });
    const completedAppointments = await Appointment.countDocuments({ status: 'Completed' });

    res.render('appointments/index', {
      appointments,
      departments,
      search: search || '',
      selectedStatus: status || 'All',
      selectedDepartment: department || 'All',
      stats: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
      },
    });
  } catch (error) {
    console.log(error);
    res.send('Server Error');
  }
});

router.get('/appointments/new', ensureAuth, (req, res) => {
  res.render('appointments/create');
});

router.post('/appointments', ensureAuth, async (req, res) => {
  try {
    await Appointment.create(buildAppointmentData(req.body));

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.send('Error creating appointment');
  }
});

router.get('/appointments/edit/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.send('Appointment not found');
    }

    res.render('appointments/edit', {
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.send('Error loading edit page');
  }
});

router.put('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      buildAppointmentData(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!appointment) {
      return res.send('Appointment not found');
    }

    res.redirect(`/appointments/${appointment._id}`);
  } catch (error) {
    console.log(error);
    res.send('Error updating appointment');
  }
});

router.delete('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.send('Appointment not found');
    }

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.send('Error deleting appointment');
  }
});

router.get('/appointments/:id', ensureAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.send('Appointment not found');
    }

    res.render('appointments/show', {
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.send('Error loading appointment');
  }
});

module.exports = router;