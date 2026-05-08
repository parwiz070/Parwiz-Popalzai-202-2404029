const express = require('express');

const Appointment = require('../models/Appointment');

const router = express.Router();

router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.post('/appointments', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.put('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

router.delete('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found',
      });
    }

    res.json({
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;