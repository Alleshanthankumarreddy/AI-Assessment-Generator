import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import TeacherModel from "../models/TeacherModel.js";


// ================= REGISTER =================

const registerTeacher = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      subject,
      institution,
      institutionLocation,
    } = req.body;

    const existingTeacher =
      await TeacherModel.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Teacher already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const teacher = await TeacherModel.create({
      name,
      email,
      password: hashedPassword,
      subject,
      institution,
      institutionLocation,
    });

    // JWT Token
    const token = jwt.sign(
      {
        teacherId: teacher._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeTeacher = {

  _id: teacher._id,

  name: teacher.name,

  email: teacher.email,

  subject: teacher.subject,

  institution: teacher.institution,

  institutionLocation:
    teacher.institutionLocation,

};

res.status(201).json({

  success: true,

  message:
    "Teacher Registered Successfully",

  teacher: safeTeacher,

});
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ================= LOGIN =================

const loginTeacher = async (req, res) => {
  try {

    const { email, password } = req.body;

    const teacher =
      await TeacherModel.findOne({ email });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      teacher.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT
    const token = jwt.sign(
      {
        teacherId: teacher._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeTeacher = {

  _id: teacher._id,

  name: teacher.name,

  email: teacher.email,

  subject: teacher.subject,

  institution: teacher.institution,

  institutionLocation:
    teacher.institutionLocation,

};

res.status(200).json({

  success: true,

  message:
    "Login Successful",

  teacher: safeTeacher,

});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// ================= LOGOUT =================

const logoutTeacher = async (req, res) => {
  try {

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
};