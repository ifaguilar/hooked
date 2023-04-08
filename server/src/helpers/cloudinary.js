import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (base64String, folderName) => {
  try {
    const response = await cloudinary.v2.uploader.upload(base64String, {
      folder: folderName,
      overwrite: false,
      resource_type: "auto",
      format: "jpg",
      quality: 100,
      eager: [{ width: 144, height: 144, crop: "pad", background: "auto" }],
    });

    return response.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update image.");
  }
};
