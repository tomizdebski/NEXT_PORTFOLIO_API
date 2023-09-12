const loginSchema = {
  email: {
    notEmpty: true,
    errorMessage: "Field cannot be empty",
  },
  password: {
    notEmpty: true,
    errorMessage: "Field cannot be empty",
  },
  trim: true,
  escape: true,
};

const registrationSchema = {
  firstName: {
    notEmpty: true,
    isLength: { options: { min: 4 } },
    errorMessage: "firatName must be greater than 4 ",
  },
  lastName: {
    notEmpty: true,
    isLength: { options: { min: 4 } },
    errorMessage: "lastName must be greater than 8 ",
  },
  password: {
    notEmpty: true,
    isLength: { options: { min: 8 } },
    errorMessage: "Password must be greater than 8 ",
  },
  email: {
    notEmpty: true,
    normalizeEmail: true,
    errorMessage: "This is not a email",
  },

  trim: true,
  escape: true,
};

module.exports = { loginSchema, registrationSchema };
