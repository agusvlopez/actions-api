import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config.ts'

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
})

//upload an image (OLD)
// export async function uploadImageToCloudinary(filePath: string) {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'actions'
//     })
//     return { public_id: result.public_id, url: result.secure_url }
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//   }

// }

//upload an image
export async function uploadImageToCloudinary(fileBuffer: Buffer) {
  return new Promise<{ public_id: string; url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "actions" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No result from Cloudinary"));
        resolve({
          public_id: result.public_id,
          url: result.secure_url
        });
      }
    );

    stream.end(fileBuffer);
  });
}

//delete an image
export async function deleteImageFromCloudinary(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}