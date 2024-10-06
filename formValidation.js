const validator = require('validator');

// Function to validate and sanitize form inputs
const validateFormInput = (req) => {
  // Initialize an errors object to hold any validation errors
  const errors = {};

  // Sanitize input
  const name = validator.escape(req.body.name);
  const email = validator.normalizeEmail(req.body.email);
  const message = validator.escape(req.body.message);

  // Validate inputs
  if (!name || name.length === 0) {
    errors.name = 'Name is required';
  }
  
  if (!email || !validator.isEmail(email)) {
    errors.email = 'Valid email is required';
  }

  if (!message || message.length === 0) {
    errors.message = 'Message cannot be empty';
  }

  // Return sanitized input and any validation errors
  return {
    sanitizedInputs: { name, email, message },
    errors,
  };
};

module.exports = validateFormInput;

  