import { contactModel } from '../models/contactModel.js';
import ErrorHandler from '../utils/errorHandler.js';

export const newContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    const contact = await contactModel.create({
      contactDetails: {
        firstName,
        lastName,
        email,
        message,
      },
    });

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
};
