import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from "fs"


export const uploadImage = async (imagePath: string): Promise<UploadApiResponse> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "profile_images"
  };

  const result = await cloudinary.uploader.upload(imagePath, options);

  fs.rm(imagePath, (err) => {
    if (err) {
      throw err
    } else {
      console.log("Successfully deleted the file.")
    }
  })

  return result
}