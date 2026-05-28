import multer from "multer";

import path from "path";


// STORAGE
const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(null, "uploads/");

  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  },

});


// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "application/pdf",
    "text/plain",
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF and TXT files allowed"
      ),
      false
    );

  }

};


const upload = multer({
  storage,
  fileFilter,
});

export default upload;