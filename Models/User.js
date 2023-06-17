const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid Email"],
      required: [true, "Email Id required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Required"],
      validate: {
        validator: (value) => {
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowerCase: 3,
            minNumber: 1,
            minUpperCase: 1,
            minSymbols: 1,
          });
        },
      },
      message: "password {VALUE } is not strong Enough",
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password Required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "password not Match",
      },
    },
    role: {
      type: String,
      enum: ["engineer", "admin", "pgRunner"],
      default: "pgRunner",
    },
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Name should at least 3 characters"],
      maxLength: [30, "Name is too large"],
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [3, "Name should at least 3 characters"],
      maxLength: [30, "Name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid Mobile Number",
      ],
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, " Please provide a valid image URL"],
    },
    status: {
      type: String,
      enum: ["active", "in-active", "block"],
      default: "active",
    },
    shippingAddress: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordExpires: Date,
  },
  {
    timestamps: true,
  }
);

/* password hashed korar jonno prothome "bcrypt" or bcryptjs pakage install korte  hobe */

userSchema.pre("save", function (next) {
  const password = this.password;
  /* 
    // to use pakage of only bcrypt
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    //console.log('salt',salt)
    const hashedPassword = bcrypt.hashSync(password,salt)
    //console.log(hashedPassword); */

  /* to use pakage bcryptjs */
  const hashedPassword = bcryptjs.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
