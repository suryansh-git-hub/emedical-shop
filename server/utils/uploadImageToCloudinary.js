import cloudinary from "../config/cloudinary.js";

// =======================================
// Upload Image To Cloudinary
// =======================================

const uploadImageToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "emedi-pharmacy/medicines",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result.secure_url);
        }
      );

    uploadStream.end(file.buffer);
  });
};

export default uploadImageToCloudinary;