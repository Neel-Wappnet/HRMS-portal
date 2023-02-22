import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';


export const uploadImage = async (imagePath: string):Promise<UploadApiResponse> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  const result = await cloudinary.uploader.upload(imagePath, options);

  return result
}