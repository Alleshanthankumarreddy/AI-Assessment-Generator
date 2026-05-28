import jwt from "jsonwebtoken";
import TeacherModel from "../models/TeacherModel.js";

const auth = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const teacher = await TeacherModel
      .findById(decoded.teacherId)
      .select("-password");

    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: "Teacher not found",
      });
    }

    req.teacher = teacher;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

export default auth;