import multer from "multer"
import { Readable } from "stream"
import { cloudinary, hasCloudinaryConfig } from "../config/cloudinary.js"

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed"), false)
  }
}

export const uploadSingle = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}).single("image")

const uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "hyper-local-delivery-dispatcher"
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )

    Readable.from(buffer).pipe(uploadStream)
  })
}

export const uploadHandler = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" })
  }

  if (!hasCloudinaryConfig) {
    return res.status(500).json({
      message: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    })
  }

  const result = await uploadBufferToCloudinary(req.file.buffer)
  const url = result.secure_url || result.url

  return res.status(200).json({ url })
}

export default {
  uploadSingle,
  uploadHandler
}
